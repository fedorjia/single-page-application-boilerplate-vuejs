<template>
    <div class="confirm-modal">
        <modal ref="modal" :title="title" :dismiss-on-mask="dismissOnMask">
            <div slot="content" class="inner">
                <div class="title">{{ title }}</div>
                <div class="content" v-show="hasContent">{{ content }}</div>
                <div class="buttons">
                    <div class="button-cancel button button-clear" @click="onClick(0)">{{ cancelButtonText }}</div>
                    <div class="button-confirm button button-clear" @click="onClick(1)">{{ confirmButtonText }}</div>
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
		cancelButtonText: 'Cancel',
		confirmButtonText: 'Confirm',
		// cancelButtonCls: 'button-white',
		// confirmButtonCls: 'button-blue',
        dismissOnMask: false,
		onSelect: null
	};
	const initialData = Object.assign({}, data);

	export default {
		/***
		 * options:
		 *     content:
		 *           default: ''
		 *     cancelButtonText:
		 *          default: Cancel
		 *     confirmButtonText:
		 *          default: Confirm
		 *     cancelButtonCls:
		 *          default: 'button-white'
		 *     confirmButtonCls:
		 *          default: 'button-blue'
		 *     onSelect:
		 *          说明: 回调
		 *          default: null
		 */
        components: {
            Modal
        },

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

            onClick(index) {
                this.$refs.modal.dismiss(() => {
                    if(this.onSelect) {
                        this.onSelect(index);
                    }
                    Object.assign(this.$data, initialData);
                });
            }
		}
	};
</script>
