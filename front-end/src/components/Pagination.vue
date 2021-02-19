<template>
  <div class="actions text-center" v-if="pagination.count > 0">
    <b-button
      variant="primary"
      @click="previous()"
      class="mr-2"
      :disabled="disablePrevious"
    >Anterior</b-button>
    <b-button variant="primary" @click="next()" :disabled="disableNext">Próximo</b-button>
    <p class="text-muted">
      <small>Do projeto {{first}} até {{last}} - Total de {{pagination.count}} projetos</small>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    pagination: Object
  },
  methods: {
    previous() {
      this.pagination.offset -= this.pagination.limit;
      this.$emit('onPreviousClick')
    },
    next() {
      this.pagination.offset += this.pagination.limit;
      this.$emit('onNextClick')
    }
  },
  computed: {
    disablePrevious() {
      return !this.pagination || this.pagination.offset == 0;
    },
    disableNext() {
      return (
        !this.pagination ||
        this.pagination.offset + this.pagination.limit >= this.pagination.count
      );
    },
    first() {
      return this.pagination.count > 0 ? this.pagination.offset + 1 : 0;
    },
    last() {
      const last = this.pagination.offset + this.pagination.limit;
      return last < this.pagination.count ? last : this.pagination.count;
    }
  }
};
</script>

<style>
</style>