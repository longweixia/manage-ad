<template>
  <div style="text-align:right;margin-top:20px">
    <Select
      v-show="!disPageSize" 
      v-model="pagination.pageSize" 
      @on-change="handlePageSizeChange" 
      class="gvt-page-size">
      <Option v-for="item in pagination.pageSizeOpts" :value="item" :key="item">
        {{item  }}
      </Option>
    </Select>
    <Page
      class="gvt-page"
      :current.sync="pagination.pageNum"
      :total="Number(pagination.total)"
      :page-size="pagination.pageSize"
      @on-change="handlePageChange"
      show-elevator
      show-total>
    </Page>
  </div>
</template>

<script>
import { PAGE_PARAMS } from "../../utils/constants.js";
export default {
  name: "Pagination",

  props: {
    disPageSize: Boolean,

    pagination: {
      type: Object,
      default: () => {
        return Object.assign({}, PAGE_PARAMS);
      }
    }
  },

  methods: {
    handlePageSizeChange() {
      this.$emit("on-page-size-change",this.pagination);
    },

    handlePageChange() {
      this.$emit("on-page-change",this.pagination);
    }
  }
};
</script>

<style lang="less">
.gvt-page-size {
  width: 120px;
  text-align: center;
  display: inline-block;
  line-height: 32px;
//   margin-top: -20px;
  margin-top: -25px;
}

.gvt-page {
  display: inline-block;
  margin-left: 10px;
}
</style>

