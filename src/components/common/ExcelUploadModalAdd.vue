<template>
    <Modal v-model="visible" title="批量打榜">
        <div>
            <div>
                <div>下载模板，并在模板输入粉丝ID、明星ID及打榜热力值， 之后导入系统。</div>
                <div>
                    <span @click="downModel" class="tip-text">下载模板</span>
                </div>
            </div>
        </div>
        <Form ref="uploadForm" inline>
            <input ref="upload" type="file" id="upload" style="display: none" @change="fileChange" accept=".csv, .xlsx, .xls" />
            <FormItem style="cursor: pointer; text-align: left">
                <span class="tip-text">{{ filename }}</span>

                <Icon
                    v-if="filename"
                    @click="deleteFile"
                    type="md-close-circle"
                    style="font-size: 20px; cursor: pointer; margin-left: 5px; line-height: 25px"
                />
                <Button style="margin-top: 10px; display: inline-block; margin-left: 10px" @click="flieClick"> 选择文件 </Button>
            </FormItem>
        </Form>

        <template slot="footer">
            <div style="text-align: center">
                <Button type="primary" :loading="submitLoading" @click="confirm">提交</Button>
            </div>
        </template>
    </Modal>
</template>

<script>
import qs from 'qs';
export default {
    props: {
        uploadModel: Boolean
    },
    data() {
        return {
            visible: this.uploadModel,
            portData: {
                visible: true,
                title: ''
            },
            filename: '',
            data: '',
            submitLoading: false
        };
    },

    watch: {
        visible(val) {
            if (!val) {
                // 清除文件相关信息
                this.$refs['upload'].value = '';
                this.filename = '';
                this.$nextTick(() => {
                    this.$refs['uploadForm'].resetFields();
                });
            }
            this.$emit('update:uploadModel', val);
            this.$emit('success', val);
        },

        uploadModel(val) {
            this.visible = val;
        }
    },

    methods: {
        deleteFile() {
            this.$refs['upload'].value = '';
            this.fileName = '';
            // this.$refs['upload'].files = '';
            // this.fileChange();
        },
        fileChange() {
            const files = this.$refs['upload']['files'];
            this.filename = files[0] ? files[0].name : '';
        },

        downModel(name) {
            this.axios
                .get(`/fens/downStarHitModel`, { responseType: 'arraybuffer' })
                .then((res) => {
                    let data = res;
                    let blob = new Blob([data], { type: 'application/vnd.ms-excel' }); //res 就是文件流了
                    let a = document.createElement('a');
                    a.download = '批量打榜';
                    a.href = URL.createObjectURL(blob);
                    a.click();

                    // window.location.href = objectUrl;
                })
                .catch((err) => {
                    console.log('err', err);
                });
        },

        flieClick() {
            this.$refs['upload'].click();
        },
        // 保存
        async confirm() {
            const file = this.$refs['upload']['files'][0];
            // 组装参数
            const formData = new FormData();
            formData.append('file', file);
            this.axios
                .post(`/fens/importHitSatrVigourVal`, formData)
                .then((res) => {
                    this.$Message.success('提交成功');
                    this.visible = false;
                })
                .catch((err) => {
                    console.log('err', err);
                });
        }
    }
};
</script>
<style lang="less" scoped>
.tip-text {
    color: #2d8cf0;
    cursor: pointer;
}
</style>
