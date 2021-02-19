<template>
  <div>
    <b-card
      :title="job.title"
      :sub-title="job.Hirer.name"
      class="my-2"
      bg-variant="light"
    >
      <b-card-text>{{ job.description }}</b-card-text>

      <div class="row">
        <div class="col-6">
          <strong>Orçamento</strong>
          {{ job.budget|money }} 
        </div>

        <div class="col-6">
          <strong>Propostas até</strong>
          {{ job.deadline |date}}
        </div>
      </div>
      <div class="text-right">
        <hr />
        <slot name="actions"></slot>
      </div>
    </b-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: { job: Object },
  filters: {
    money(value) {
      return parseFloat(value).toLocaleString("pt-AO", {
        style: "currency",
        currency: "AOA",
      });
    },
    date(value) {
      return moment(value).format("DD/MM/YYYY");
    },
  },
};
</script>
