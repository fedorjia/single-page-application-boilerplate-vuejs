<template>
    <div class="modal-overlay" @click="onClickOverlay()">
        <div class="modal" @click="onClickModal($event)">
            <slot name="content" @click="onClickModal($event)"></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        /***
         * props:
         *     dismissOnMask:
         *            default: false
         */
        props: {
            dismissOnMask: {
                type: Boolean,
                default: false
            },
            duration: {
                type: Number,
                default: 180
            }
        },

        methods: {
            /**
             * show
             */
            show (callback) {
                $(this.$el).velocity('transition.shrinkIn', this.duration, () => {
                    if (callback) {
                        callback();
                    }
                });
            },

            /***
             * dismiss
             * */
            dismiss(callback) {
                $(this.$el).velocity('fadeOut', this.duration, () => {
                    if (callback) {
                        callback();
                    }
                });
            },

            /**
             * destroy
             **/
            destroy() {
                this.dismiss(() => {
                    $(this.$el).remove();
                });
            },

            /**
             * on click overlay
             */
            onClickOverlay() {
                if (this.dismissOnMask) {
                    this.dismiss();
                }
            },

            /**
             * on click modal
             */
            onClickModal(event) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    };
</script>
