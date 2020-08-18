<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-danger" v-if="errorMsg">Error Message</div>
        <div class="alert alert-success" v-if="successMsg">Success Message</div>

        <div class="table-responsive">
          <table class="table table-bordered table-stripped">
            <thead>
              <tr class="text-center bg-info text-light">
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Website</th>
                <th>Addresses</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center" v-for="(customer, index) in customerslist" :key="index">
                <td>
                  <span @click="sendCustData()">
                    <router-link
                      :to="{ name: 'customer', params: { custId: index + 1, data: customer }}"
                    >{{ customer.fname + ' ' + customer.lname }}</router-link>
                  </span>
                </td>
                <td>{{ customer.email }}</td>
                <td>{{ customer.mobile }}</td>
                <td>{{ customer.website }}</td>
                <td>{{ customer.address }}</td>
                <td>
                  <a
                    href="#"
                    class="text-success"
                    @click="selectCust(customer), showEditModal = true"
                  >
                    <tagicon name="edit" />
                  </a>
                </td>
                <td>
                  <a
                    href="#"
                    class="text-danger"
                    @click="selectCust(customer),showDeleteModal = true"
                  >
                    <tagicon name="trash" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div id="overlay" v-if="showEditModal">
      <div class="modal-dialogue">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User</h5>
            <button type="button" class="close" @click="showEditModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <form action="#" method="post">
              <div class="form-group">
                <input
                  type="text"
                  name="fname"
                  class="form-control form-control-lg"
                  v-model="currentCust.fname"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="lname"
                  class="form-control form-control-lg"
                  placeholder="Last Name"
                  v-model="currentCust.lname"
                />
              </div>
              <div class="form-group">
                <input
                  type="email"
                  name="email"
                  class="form-control form-control-lg"
                  placeholder="Email"
                  v-model="currentCust.email"
                />
              </div>
              <div class="form-group">
                <input
                  type="tel"
                  name="mobile"
                  class="form-control form-control-lg"
                  placeholder="Mobile"
                  v-model="currentCust.mobile"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="website"
                  class="form-control form-control-lg"
                  placeholder="Website"
                  v-model="currentCust.website"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="address"
                  class="form-control form-control-lg"
                  placeholder="Address"
                  v-model="currentCust.address"
                />
              </div>
              <div class="form-group">
                <button
                  class="btn btn-info btn-block btn-lg"
                  @click="updateCust(), showEditModal = false"
                >Update User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete User Modal -->
    <div id="overlay" v-if="showDeleteModal">
      <div class="modal-dialogue">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete User</h5>
            <button type="button" class="close" @click="showDeleteModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <h4 class="text-danger">Are you sure, you want to delete this user?</h4>
            <h5>You are deleting, {{ currentCust.fname + currentCust.lname }}</h5>
            <hr />
            <div class="float-right">
              <button class="btn btn-danger btn-lg mr-2" @click="deleteCust(), showDeleteModal = false">Yes</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button
                class="btn btn-success btn-lg"
                @click="showDeleteModal = false"
              >No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomersList",
  props: ["customerslist"],
  data() {
    return {
      errorMsg: false,
      successMsg: false,
      showEditModal: false,
      showDeleteModal: false,
      currentCust: {},
    };
  },
  methods: {
    sendCustData() {
      this.$emit("msgFromChild");
    },
    updateCust() {
      this.$store.dispatch("updateCustomer", this.currentCust);
    },
    deleteCust() {
      this.$store.dispatch("deleteCustomer", this.currentCust.id);
    },
    selectCust(payload) {
      this.currentCust = payload;
    },
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

td {
  a {
    text-decoration-line: none;
  }
}
</style>
