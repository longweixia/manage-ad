<template>
<div class="container">
            1
</div>
</template>

<script>
export default {
  name: 'mdApp',
    data: function() {
        return {
            articleContent: {
                title: '', //输入标题
                types: 'baidu', //大类的值
                autor: '手赚联盟N01', //作者
                Pageview: '278', //浏览量
                tag: '置顶', //文章标记，如：顶
                level: 5, //优先级
                coverImage: null //封面图
                // content:"",//不声明content的话，v-model articleContent.content会报错
            }, //文章对象
            html: '',
            configs: {},
            // types: 'baidu', //文章所属的大类

            // 大类
            options: [
                //文章大类数据
                {
                    value: 'baidu',
                    label: '百度'
                },
                {
                    value: 'gogle',
                    label: '谷歌'
                },
                {
                    value: 'sanliuling',
                    label: '360'
                },
                {
                    value: 'sougou',
                    label: '搜狗'
                },
                {
                    value: 'tuiguang',
                    label: '推广'
                }
            ],

            coverImage: '',
            dialogVisible: false,
            // uploadImg: `${this.baseUrl}/malls/uploadImg`
            uploadImg: "http://47.103.40.123:3001/malls/uploadImg"
        };
    },

    methods: {
        // 上传封面图成功的回调
        Resimg(response, file, fileList) {
            this.articleContent.coverImage = response.result.url;
        },
        // 删除封面图
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        //   放大封面图
        handlePictureCardPreview(file) {
            this.coverImage = file.url;
            this.dialogVisible = true;
        },
        // 将图片上传到服务器，返回地址替换到md中
        $imgAdd(pos, $file) {
            var formdata = new FormData();
            formdata.append('file', $file);
            // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
            this.axios({
                url: `${this.baseUrl}/malls/uploadImg`,
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(res => {
                this.$refs.md.$img2Url(pos, res.data.result.url);
            });
        },
        change(value, render) {
            // render 为 markdown 解析后的结果
            this.html = render;
        },
        submit() {
            // 如果id存在就是修改，如果id不存在就是新增
            // 拼装article数据
            let article = {};
            article[this.articleContent.types] = [this.articleContent];
            // console.log(article);
            this.axios
                .post(`${this.baseUrl}/articles/post`, {
                    data: {
                        userName: 'longwei',
                        types: this.articleContent.types,
                        id: this.articleContent.id,
                        article: article
                    }
                })
                .then(res => {
                    if (res.data.status == '0') {
                        this.$message.success('发布成功');
                    } else {
                        this.$message.error('发布失败' + res.data.msg);
                    }
                })
                .catch(err => {
                    this.$message.error('发布失败' + err);
                });
        }
    },
    mounted() {
        if (this.$route.params.articleContent) {
            this.articleContent = this.$route.params.articleContent;
            this.dialogVisible = true;
        } else {
            this.articleContent = {};
            this.dialogVisible = false;
        }

        // this.coverImage = this.$route.params.articleContent ? this.$route.params.articleContent.coverImage : '';
        console.log(this.articleContent, 99999, this.articleContent.id);
    }
};
</script>
<style scoped>
.plugins-tips {
    text-align: justify;
}
.editor-btn {
    margin-top: 20px;
}
.ad-title {
    margin: 10px;
    display: inline-block;
}
.ad-level {
    display: inline-block;
}
.ad-type {
    margin-left: 115px;
}
.ad-type-text {
    display: inline-block;
    width: 50px;
}
.ad-cover-img {
    display: inline-block;
    position: relative;
}
.img-cover {
    position: absolute;
}
</style>