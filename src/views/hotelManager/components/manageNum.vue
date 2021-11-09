<template>
    <a-modal
            :visible="manageNumVisible"
            title="价格更改"
            cancelText="取消"
            okText="确定"
            @cancel="cancel"
            @ok="handleSubmit"
    >
        <a-form :form="form" style="margin-top: 30px" v-bind="formItemLayout">

            <a-form-item label="房间数量">
                <a-input-number :min="0"
                                :placeholder="record.total"

                                v-decorator="['num', {
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
        name: 'manageNum',
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
                'manageNumVisible',
                'residences'
            ])
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'manageNum'});

        },
        mounted() {
            this.getResidences()
        },
        methods: {
            ...mapMutations([
                'set_manageNumVisible'
            ]),
            ...mapActions([
                'submitManageNumParams',
                'getResidences'
            ]),
            cancel() {
                this.set_manageNumVisible(false)
            },

            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        const data = {
                            id: this.record.id,
                            total: this.form.getFieldValue('num'),

                        }

                        this.submitManageNumParams(data)
                    }
                });
            },
        }
    }
</script>
