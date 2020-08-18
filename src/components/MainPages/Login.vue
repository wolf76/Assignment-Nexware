<template>
  <div class="container text-center">
    <form class="form-login" @submit.prevent="onLoginIn">
      <div class="row justify-content-center" v-if="error">
        <div class="d-flex p-3" style="width: 100%">
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </div>
      </div>

      <h2 class="h3 mb-3 font-weight-normal">Login</h2>
      <label for="inputEmail" class="sr-only">Email</label>
      <input
        type="email"
        id="email"
        class="form-control"
        placeholder="Email"
        v-model="email"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="password"
        class="form-control"
        placeholder="Password"
        v-model="password"
        required
      />
      <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">
        <span v-if="!loading">Sign in</span>
        <span v-else>
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
          Loading
        </span>
      </button>
    </form>

    <!-- ADD LINK FOR REGISTER PAGE HERE -->
    <div class="register-link mt-3">
      <h6>
        <router-link to="/register">Don't have a link, register here...</router-link>
      </h6>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(['user', 'error', 'loading'])
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.replace({ name: "customers-list" });
      }
    },
  },
  methods: {
    onLoginIn() {
      this.$store.dispatch("loginUser", {
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
.form-login {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;

  input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  input[type="password"] {
    margin-bottom: -1px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
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
