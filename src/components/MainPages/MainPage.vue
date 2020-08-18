<template>
  <div class="div">
    <div class="container-fluid">
      <div class="row bg-dark">
        <div class="col-lg-12">
          <div class="fd"></div>
          <p
            class="text-center text-light display-4 pt-2"
            style="font-size: 24px"
          >Customers Main Listing</p>
        </div>
      </div>
    </div>

    <!-- Loader spinner -->
    <div class="container container-spinner" v-if="loading">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="container" v-else>
      <div class="row mt-3">
        <div class="col-lg-12">
          <button class="btn btn-secondary float-right" @click="onLogout">Logout</button>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-lg-6">
          <h3 class="text-info">
            Registered Customers
            <strong>({{ customersList.totalCust }})</strong>
          </h3>
        </div>
        <div class="col-lg-6">
          <button class="btn btn-info float-right" @click="showAddModal = true">
            <tagicon name="user-plus"></tagicon>&nbsp;&nbsp;Add New User
          </button>
        </div>
      </div>
      <hr class="bg-info" />
      
      <!-- Customer Table Listing -->
      <button class="btn btn-success" v-if="custIdVal" @click="backToggle()">Go back to List</button>

      <Customer v-if="custIdVal"/>

      <CustomersList :customerslist="customersList" @msgFromChild="childMethod" v-else />
    </div>

    <!-- Add New User Modal -->
    <div id="overlay" v-if="showAddModal">
      <div class="modal-dialogue">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New User</h5>
            <button type="button" class="close" @click="showAddModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <form action="#">
              <div class="form-group">
                <input
                  type="text"
                  name="fname"
                  v-model="formData.fname"
                  class="form-control form-control-lg"
                  placeholder="First Name"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="lname"
                  v-model="formData.lname"
                  class="form-control form-control-lg"
                  placeholder="Last Name"
                />
              </div>
              <div class="form-group">
                <input
                  type="email"
                  name="email"
                  v-model="formData.email"
                  class="form-control form-control-lg"
                  placeholder="Email"
                />
              </div>
              <div class="form-group">
                <input
                  type="tel"
                  name="mobile"
                  v-model="formData.mobile"
                  class="form-control form-control-lg"
                  placeholder="Mobile"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="website"
                  v-model="formData.website"
                  class="form-control form-control-lg"
                  placeholder="Website"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="address"
                  v-model="formData.address"
                  class="form-control form-control-lg"
                  placeholder="Address"
                />
              </div>
              <div class="form-group">
                <button
                  class="btn btn-info btn-block btn-lg"
                  @click="addCustomerMethod(), showAddModal = false"
                >Add User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomersList from "../Customers/CustomersList";
import Customer from "../Customers/Customer";
import { mapGetters } from "vuex";

export default {
  name: "MainPage",
  components: {
    CustomersList,
    Customer
  },
  data() {
    return {
      showAddModal: false,
      formData: {
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        website: "",
        address: "",
      },
      custId: false
    };
  },
  computed: {
    custIdVal() {
      return this.custId
    },
    ...mapGetters(["customersList", "loading", "user"]),
  },
  watch: {
    user(value) {
      if (value == null && value == undefined) {
        this.$router.replace({ name: "login" });
      }
    },
  },
  methods: {
    addCustomerMethod() {
      this.$store.dispatch("addCustomer", this.formData);
    },
    childMethod() {
      this.custId = true;
    },
    backToggle() {
      this.custId = false;
      this.$router.replace('/customers-list')
    },
    onLogout() {
      this.$store.dispatch('logout')
    }
  },
};
</script>

<style lang="scss" scoped>
#overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);

  .modal-dialogue {
    width: 40%;
    margin: auto;
    margin-top: 5rem;
  }
}

.container-spinner {
  margin-top: 5rem;
  text-align: center;
}
</style>
