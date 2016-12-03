<template>
    <div class="infinite">
        <slot name="content"></slot>
        <div v-show="!isCompleted && skip !== 0" class="load-more-bar" @click="onClickMore">
            <i v-show="isBusy" class="spinner iconfont icon-loading"/>&nbsp;
            <div class="text">{{ barText }}</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    /*****************************************
     * Infinite vue
     * Vue 组件
     *****************************************/
    import http from '../../utils/http';

    const data = {
        skip: 0,
        isBusy: false,
        isCompleted: false,
        params: {}
    };
    const initialData = Object.assign({}, data);

    export default {
        /***
         * props:
         *     url:
         *           说明: URL
         *           default: ''
         *     limit:
         *           说明: 每页条数
         *           default: 30
         *     delay:
         *           说明: load加载延时
         *           default: 500
         *     isAutoLoad:
         *           说明: 是否自动加载
         *           default: true
         *     loadingText:
         *           说明: 加载中文字
         *           default: '加载中...'
         *     loadMoreText:
         *           说明: 加载更多
         *           default: '加载更多'
         *     loadMoreClickText:
         *           说明: 点击加载更多
         *           default: '点击加载更多'
         */
        props: {
            store: Object,
            url: {type: String, requried: true},
            limit: {type: Number, default: 20},
            delay: {type: Number, default: 500},
            isAutoLoad: {type: Boolean, default: true},
            loadingText: {type: String, default: 'Loading...'},
            loadMoreText: {type: String, default: 'Load More'},
            loadMoreClickText: {type: String, default: 'Click To Load More'},
            onLoadSuccess: Function, // data nofity
            onLoadFailure: Function
        },

        components: {

        },

        data() {
            return data;
        },

        beforeDestroy() {
            Object.assign(this.$data, initialData);
        },

        computed: {
            barText() {
                if (this.isAutoLoad) {
                    return this.isBusy ? this.loadingText : this.loadMoreText;
                } else {
                    return this.isBusy ? this.loadingText : this.loadMoreClickText;
                }
            }
        },

        mounted () {
            if (this.isAutoLoad) {
                this.onScroll();
            }
        },

        methods: {
            /**
             * refresh
             */
            refresh(id) {
                this.skip = 0;
                this.isCompleted = false;
                this.load();
            },

            /**
             * filter
             */
            filter(params) {
                this.params = params;
                this.refresh();
            },

            /**
             * load remote data
             **/
            load() {
                if(this.isBusy) {
                    return;
                }

                const params = this.params || {};
                params.skip = this.skip;
                params.limit = this.limit;

                this.isBusy = true;
                http.get(this.url, params)
                    .then((resp) => {
                        const items = resp.data;
                        if (items.length < this.limit) {
                            this.isCompleted = true;
                        } else {
                            // set skip id for the next load
                            this.skip = items[items.length-1].id;
                        }

                        if (this.onLoadSuccess) {
                            this.onLoadSuccess(items);
                        }
                        this.isBusy = false;
                    })
                    .catch((err) => {
                        this.isBusy = false;
                        this.onLoadFailure({message: err.message, __timestamp__: Date.now()});
                    });
            },

            /**
             * on scroll event
             */
            onScroll() {
                var $target = $(this.$el);
                $target.scroll(() => {
                //    console.log($target.scrollTop() + $target.height(), $target.get(0).scrollHeight);
                    //noinspection JSValidateTypes
                    if (($target.scrollTop() + $target.height() >= $target.get(0).scrollHeight)
                        && !this.isBusy && !this.isCompleted) {

                        // load next page
                        setTimeout(() => {
                            this.load();
                        }, this.delay);
                    }
                });
            },

            /**
             * on click more text
             */
            onClickMore() {
                this.load();
            }
        }
    };
</script>
