<template>
    <a-modal
            :visible="checkOutDateVisible"
            title="预计退房时间"
            cancelText="取消"
            okText="确定"
            @cancel="cancel"
            @ok="handleSubmit"
    >
        <a-form :form="form" style="margin-top: 30px" v-bind="formItemLayout">

            <a-form-item v-bind="formItemLayout" label="预计退房时间">
            <a-date-picker
                    format="YYYY-MM-DD"
                    v-decorator="[
                        'date',
                        {
                            rules: [{ required: true, message: '请选择时间' }]
                        }
                    ]"
            />
        </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    const moment = require('moment')

    export default {
        name: 'checkOutDate',
        props: {
            record:Object,
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
                'checkOutDateVisible',
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
                'set_checkOutDateVisible'
            ]),
            ...mapActions([
                'submitCheckOutDateParams',
                'getResidences'
            ]),
            cancel() {
                this.set_checkOutDateVisible(false)
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        const data = {
                            id:this.record.id,
                            checkOutDate:moment(this.form.getFieldValue('date')).format('YYYY-MM-DD'),
                        }
                        this.submitCheckOutDateParams(data)
                    }
                });
            },
        }
    }
</script>
