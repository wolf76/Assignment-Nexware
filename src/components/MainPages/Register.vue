<template>
  <div class="container text-center">
    <form class="form-register" @submit.prevent="onRegister">
      <div class="alert alert-danger" role="alert" v-if="!passwordsMatch">Passwords do not match...!</div>
      <div class="row justify-content-center" v-if="error">
        <div class="d-flex p-3" style="width: 100%">
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </div>
      </div>
      <h2 class="h3 mb-3 font-weight-normal">Register</h2>
      <label for="email" class="sr-only">Email</label>
      <input
        type="email"
        id="email"
        class="form-control"
        placeholder="Email"
        v-model="email"
        required
        autofocus
      />
      <label for="password" class="sr-only">Password</label>
      <input
        type="password"
        id="password"
        class="form-control"
        placeholder="Password"
        v-model="password"
        required
      />
      <label for="confirmPassword" class="sr-only">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        class="form-control"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        v-on:blur="comparePasswords()"
      />
      <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">
        <span v-if="!loading">Sign up</span>
        <span v-else>
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          Loading
        </span>
      </button>
    </form>

    <!-- ADD LINK FOR REGISTER PAGE HERE -->
    <div class="login-link mt-3">
      <h6>
        <router-link to="/login">Already registered? Signin here...</router-link>
      </h6>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      passwordsMatch: true,
    };
  },
  computed: {
    ...mapGetters(['user', 'error', 'loading'])
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/Login");
      }
    },
  },
  methods: {
    comparePasswords() {
      this.passwordsMatch =
        this.password !== this.confirmPassword ? false : true;
    },
    onRegister() {
      this.$store.dispatch("registerUser", {
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>

<style lang="scss" scoped>
.form-register {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;

  input {
    margin-bottom: 0.5rem;
  }
}

.form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
</style>
