<template>
    <a-modal
            :visible="managePriceVisible"
            title="价格更改"
            cancelText="取消"
            okText="确定"
            @cancel="cancel"
            @ok="handleSubmit"
    >
        <a-form :form="form" style="margin-top: 30px" v-bind="formItemLayout">

            <a-form-item label="房间价格">
                <a-input-number :min="0"
                                :placeholder="record.price"

                                v-decorator="['price', {
                            rules: [
                                { required: true, message: '请输入价格' }
                            ]
                        }]"/>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
        name: 'managePrice',
        props: {
            record: Object,
        },

        data() {
            return {
                formItemLayout: {
                    labelCol: {
                        xs: {span: 12},
                        sm: {span: 6},
                    },
                    wrapperCol: {
                        xs: {span: 26},
                        sm: {span: 16},
                    },
                },
            }
        },
        computed: {
            ...mapGetters([
                'managePriceVisible',
                'residences'
            ])
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'managePrice'});

        },
        mounted() {
            this.getResidences()
        },
        methods: {
            ...mapMutations([
                'set_managePriceVisible'
            ]),
            ...mapActions([
                'submitManagePriceParams',
                'getResidences'
            ]),
            cancel() {
                this.set_managePriceVisible(false)
            },
            // changeStar(v) {
            // },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        const data = {
                            id: this.record.id,
                            price: this.form.getFieldValue('price'),

                        }

                        this.submitManagePriceParams(data)
                    }
                });
            },
        }
    }
</script>
