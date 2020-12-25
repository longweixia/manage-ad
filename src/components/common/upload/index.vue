<template>
  <div class="upload-img">
    <input type="file" ref="upload" id="imgUrl" style="display:none" @change="uploadChange"
      accept="image/jpg, image/jpeg, image/png" />
 
    <viewer v-if="imageUrl" :images="[imageUrl]">
      <div class="item">
        <img :src="imageUrl" style="width:200px;height:200px;cursor:pointer" alt="" />
        <div @click="del" class="del">x</div>
      </div>
    </viewer>
    <img @click="clickFile" v-else src="../../../assets/img/icon_add.png" style="width:200px;height:200px;cursor:pointer"
      alt="" />

    <Modal v-model="modal" title="提示" :width="400">
      <div class="remark">确定要删除吗？</div>
      <template slot="footer">
        <Button @click="modal = false">取消</Button>
        <Button @click="delImage" type="primary">确定</Button>
      </template>
    </Modal>
  </div>
</template>
<script>
  import html5ImageCompress from "html5-image-compress"
  import {
    validImage,
    compress
  } from "../../../utils/helper"

  export default {
    props: {
      value: {
        type: [String],
        default: ""
      },
      fileFormat:{
           type: [Boolean],
           default: false ,  //为false,只需要base格式,为true需要配图片文件
      }
    },
    data() {
      return {
        imageUrl: this.value,
        modal: false,
        flieData: null,//上传的文件数据
      }
    },
    watch: {
      value(val) {
        this.imageUrl = val;
      },
      imageUrl(val) {
        this.$emit("input", val)
        
        if(this.fileFormat){
            this.$emit("upImageUrl", [val,this.flieData])
        }else{
            this.$emit("upImageUrl", val)
        }
      }
    },
    methods: {
      clickFile() {
        this.$refs["upload"].click();
      },
      uploadChange() {
        let files = this.$refs["upload"].files[0];
        this.flieData = files
        //图片不能大于2M
        if (!validImage(files, 2)) {
          return
        }
        // 将图片压缩至500K以下
        var _this = this
        new html5ImageCompress(files, {
          done: (file, base64) => {
            _this.imageUrl = base64;
            document.getElementById("imgUrl").value = "";
          }
        })
      },
      del() {
        this.modal = true
      },
      delImage() {
        this.imageUrl = ''
        this.$Message.success('已删除')
        this.modal = false
      }
    }
  }

</script>

<style lang="less" scoped>
  .remark {
    font-size: 14px;
  }

  .upload-img {
    width: 220px;
    cursor: pointer;
    border: 1px dashed #dcdee2;
    height: 220px;
    padding: 10px 10px 0 10px;

    .item {
      position: relative;
      width: 200px;

      .del {
        @size: 20px;
        position: absolute;
        width: @size;
        height: @size;
        background: rgba(0, 0, 0, 0.4);
        color: white;
        border-radius: 50%;
        font-size: 17px;
        top: 5px;
        right: 5px;
        line-height: @size;
        text-align: center;
        font-weight: bold;
      }
    }
  }

</style>
