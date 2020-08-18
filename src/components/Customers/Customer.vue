<template>
  <div class="row no-gutters mt-5">
    <div class="col-lg-12">
      <div class="row content no-gutters">
        <h5>Customer Index: {{ custID }}</h5>
        <table class="table table-borderless mt-3">
          <tr>
            <th>First Name</th>
            <td>: {{ custData.fname }}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>: {{ custData.lname }}</td>
          </tr>
          <tr>
            <th>Email ID</th>
            <td>: {{ custData.email }}</td>
          </tr>
          <tr>
            <th>Mobile</th>
            <td>: {{ custData.mobile }}</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>: {{ custData.website }}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>: {{ custData.address }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Customer",
  computed: {
    custID() {
      this.$emit("msgChild");
      return this.$route.params.custId;
    },
    custData() {
      return this.$route.params.data;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
