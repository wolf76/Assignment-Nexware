<template>
  <div class="alert alert-danger alert-dismissible fade show mb-5" role="alert" :value="true">
    <strong>{{ text }}</strong>
    <button type="button" class="close" aria-label="Close" @click="onClose">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: [
    'text'
  ],
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
};
</script>

<style>
.alert {
  width: 100%;
}
</style>
