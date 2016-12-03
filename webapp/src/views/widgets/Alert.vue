<template>
    <div class="alert-modal">
        <modal ref="modal" :title="title" :dismiss-on-mask="false">
            <div slot="content" class="inner">
                <div class="title">{{ title }}</div>
                <div class="content">{{ content }}</div>
                <div class="buttons">
                    <div class="button button-clear" @click="onDismiss()">{{ buttonText }}</div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import Modal from '../widgets/Modal.vue';

    const data = {
        title: '',
        content: '',
        buttonText: 'OK',
        onSelect: null
    };
    const initialData = Object.assign({}, data);

    export default {
        components: {
            Modal
        },
        /***
         * options:
         *     content:
         *           default: ''
         *     buttonText:
         *          default: OK
         *     onSelect:
         *          default: null
         */
        data() {
            return data;
        },

        computed: {
            hasContent() {
                return !!this.content;
            }
        },

        methods: {
            show(title, options) {
                options = options || {};
                options.title = title;
                for (const option in this.$data) {
                    if (this.$data.hasOwnProperty(option)) {
                        if (options[option] !== undefined) {
                            this.$data[option] = options[option];
                        }
                    }
                }
                this.$refs.modal.show();
            },

            onDismiss() {
                this.$refs.modal.dismiss(() => {
                    if(this.onSelect) {
                        this.onSelect();
                    }
                    Object.assign(this.$data, initialData);
                });
            }
        }
    };
</script>
