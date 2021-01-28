<template>
    <div>
        <Modal v-model="modalBannaerInit" title="上传" width="600" footer-hide>
            <div>
                <div class="row-text">上传轮播图</div>
                <div class="tips">图片格式必须为：png,bmp,jpeg,jpg,gif；不可大于2M</div>
                <div class="crop-demo-btn">
                    <Button>上传文件</Button>
                    <input
                        class="crop-input"
                        type="file"
                        name="image"
                        @click="flag = 1"
                        accept="image/*"
                        @change="setImage"
                        :value="upload_input"
                    />
                </div>

                <div class="crop-demo">
                    <viewer :images="[home1Colone]">
                        <img :src="home1Colone" class="pre-img" />
                    </viewer>
                </div>

                <!-- 上传二级页面 -->
                <div class="row-text">上传二级页面</div>
                <div class="tips">图片格式必须为：png,bmp,jpeg,jpg,gif；不可大于7M M</div>
                <div class="crop-demo-btn">
                    <Button>上传文件 </Button>

                    <input
                        class="crop-input"
                        type="file"
                        name="image"
                        @click="flag = 2"
                        accept="image/*"
                        @change="setImage1"
                        :value="upload_input1"
                    />
                </div>

                <div class="crop-demo">
                    <viewer :images="[level1Colone]">
                        <img :src="level1Colone" class="pre-img" />
                    </viewer>
                </div>
                <!--  -->

                <div style="text-align: center" slot="footer">
                    <Button type="primary" @click="confirm">提交</Button>
                </div>
            </div>
        </Modal>
        <!-- 轮播 -->

        <el-dialog title="上传文件" :visible.sync="dialogVisible" width="30%">
            <VueCropper
                style="width: auto; height: 300px"
                ref="cropper"
                :img="imgSrc"
                :cropmove="cropImage"
                :zoom="cropImage"
                :ready="cropImage"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :original="option.original"
                :autoCrop="option.autoCrop"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :centerBox="option.centerBox"
                :infoTrue="option.infoTrue"
                :fixedBox="option.fixedBox"
            ></VueCropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelCrop">取 消</el-button>
                <el-button type="primary" @click="okUpload">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 二级图片 -->
        <el-dialog title="上传文件" :visible.sync="dialogVisible1" width="30%">
            <VueCropper
                style="width: auto; height: 300px"
                ref="cropper"
                :img="imgSrc"
                :cropmove="cropImage"
                :zoom="cropImage"
                :ready="cropImage"
                :outputSize="option1.size"
                :outputType="option1.outputType"
                :info="true"
                :full="option1.full"
                :canMove="option1.canMove"
                :canMoveBox="option1.canMoveBox"
                :autoCropWidth="option1.autoCropWidth"
                :autoCropHeight="option1.autoCropHeight"
                :original="option1.original"
                :autoCrop="option1.autoCrop"
                :fixed="option1.fixed"
                :fixedNumber="option1.fixedNumber"
                :centerBox="option1.centerBox"
                :infoTrue="option1.infoTrue"
                :fixedBox="option1.fixedBox"
            ></VueCropper>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelCrop1">取 消</el-button>
                <el-button type="primary" @click="okUpload1">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
export default {
    name: 'upload',
    props: {
        modalBannaer: {
            type: Boolean,
            default: false
        },
        home1: {
            type: String,
            default: ''
        },
        level1: {
            type: String,
            default: ''
        },
        bannerData: {
            type: Object,
            default: {}
        }
    },
    watch: {
        modalBannaer: {
            handler(newval, oldval) {
                this.modalBannaerInit = newval;
            },
            immediate: true
        },
        bannerData: {
            handler(newval, oldval) {
                this.bannerObj = newval;
            },
            immediate: true
        },
        home1: {
            handler(newval, oldval) {
                this.home1Colone = newval;
            },
            immediate: true
        },
        level1: {
            handler(newval, oldval) {
                this.level1Colone = newval;
            },
            immediate: true
        },
        modalBannaerInit: {
            handler(newval, oldval) {
                if (!newval) {
                    this.$emit('closeBanner1');
                }
            },
            immediate: true
        }
    },
    data() {
        return {
            upload_input: '',
            upload_input1: '',
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 1, // 裁剪生成图片的质量
                outputType: 'jpeg', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                autoCropWidth: 375 * 0.8, // 默认生成截图框宽度
                autoCropHeight: 295 * 0.8, // 默认生成截图框高度
                fixedBox: true, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [375 * 0.8, 295 * 0.8], // 截图框的宽高比例
                full: true, // 是否输出原图比例的截图
                canMoveBox: false, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: false, // 截图框是否被限制在图片里面
                infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            },
            option1: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 1, // 裁剪生成图片的质量
                outputType: 'jpeg', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: false, // 是否默认生成截图框
                autoCropWidth: 375 * 0.8, // 默认生成截图框宽度
                autoCropHeight: 295 * 0.8, // 默认生成截图框高度
                fixedBox: true, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [375 * 0.8, 295 * 0.8], // 截图框的宽高比例
                full: true, // 是否输出原图比例的截图
                canMoveBox: false, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: false, // 截图框是否被限制在图片里面
                infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            },
            flag: 1, //点击图片一还是图片2
            bannerObj: this.bannerData, //轮播对象
            flieData: null, //上传的文件数据
            modalBannaerInit: this.modalBannaerInit,
            home1Colone: this.home1,
            level1Colone: this.level1,
            defaultSrc: require('../../../assets/img/img.jpg'),
            fileList: [],
            imgSrc: '',
            dialogVisible: false,
            dialogVisible1: false
        };
    },
    components: {
        VueCropper
    },
    methods: {
        confirm() {
            this.bannerObj.home2 = this.home1Colone;
            this.bannerObj.level2 = this.level1Colone;
            this.axios
                .post(`/carousel/addOrUpdateCarousel`, this.bannerObj)
                .then(res => {
                    this.$emit('closeBanner1', false);
                    this.$Message.success('上传成功');
                })
                .catch(err => {
                    this.$Message.error(err);
                });
        },
        okUpload() {
            if (!this.home1Colone && !this.level1Colone) {
                this.$Message.error('请先上传图片');
                return false;
            }

            this.$refs.cropper.getCropData(data => {
                this.home1Colone = data;
                this.dialogVisible = false;
                this.axios
                    .post(`/common/uploadBase64`, {
                        baseStr: this.home1Colone
                    })
                    .then(res => {
                        this.home1Colone = res.data;

                        this.dialogVisible = false;
                    })
                    .catch(err => {
                        this.$Message.error(err);
                    });
            });
        },
        okUpload1() {
            if (!this.home1Colone && !this.level1Colone) {
                this.$Message.error('请先上传图片');
                return false;
            }

            this.$refs.cropper.getCropData(data => {
                this.level1Colone = data;
                this.dialogVisible1 = false;
                this.axios
                    .post(`/common/uploadBase64`, {
                        baseStr: this.level1Colone
                    })
                    .then(res => {
                        this.level1Colone = res.data;

                        this.dialogVisible1 = false;
                    })
                    .catch(err => {
                        this.$Message.error(err);
                    });
            });
        },
        setImage(e) {
            this.upload_input = '';
            this.upload_input1 = '';
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = event => {
                this.dialogVisible = true;
                this.imgSrc = event.target.result;
                this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
            this.flieData = file;
            // 组装参数
        },
        setImage1(e) {
            this.upload_input = '';
            this.upload_input1 = '';
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = event => {
                this.dialogVisible1 = true;
                this.imgSrc = event.target.result;
                this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
            this.flieData = file;
            // 组装参数
        },

        cropImage() {
            if (this.flag == 1) {
                this.home1Colone = this.$refs.cropper.getCroppedCanvas().toDataURL();
            } else {
                this.level1Colone = this.$refs.cropper.getCroppedCanvas().toDataURL();
            }
        },
        cancelCrop() {
            this.dialogVisible = false;
        },
        cancelCrop1() {
            this.dialogVisible1 = false;
        },
  
      
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
.content-title {
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
.pre-img {
    width: 100px;
    max-height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
}
.crop-demo {
    display: flex;
    align-items: flex-end;
}
.crop-demo-btn {
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    /* padding: 0 20px; */
    /* margin-left: 30px; */
    /* background-color: #409eff; */
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}
.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
.tips {
    color: #a7a7a7;
}
.row-text {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
}
/deep/ .vue-cropper {
    background-image: none;
}
/deep/ .cropper-modal {
    background: rgba(255, 255, 255, 0.5);
}
</style>
