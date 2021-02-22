<template>
    <div class="block">
        <el-timeline>
            <el-timeline-item v-if="currentPage === 1" color="#2c3e50">
                <el-button v-if="!add" type="info" icon="el-icon-plus" circle @click="addRecord"/>
                <el-row v-if="add" class="el-row" type="flex" justify="center" align="middle">
                    <el-col :span="22">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" style="height: 50px">
                        </el-input>
                    </el-col>
                    <el-col :span="1"/>
                    <el-col :span="1" type="flex" style="margin: 0 auto" class="btn-group-vertical">
                        <el-button class="input-button" style="color: #2c3e50" type="text" icon="el-icon-check"
                                   @click="uploadAdd"/>
                    </el-col>
                    <el-col :span="1" type="flex" style="margin: 0 auto" class="btn-group-vertical">
                        <el-button class="input-button" style="margin-left: 0; color: red" type="text"
                                   icon="el-icon-close" @click="cancelAddRecord"/>
                    </el-col>
                </el-row>
            </el-timeline-item>
            <el-timeline-item :timestamp="record.created" placement="top" color="#2c3e50" v-for="record in records">
                <el-row v-if="!edit[record.id]" class="el-row" type="flex" justify="center" align="middle">
                    <el-col :span="22">
                        <el-card>
                            <h4>{{ record.content }}</h4>
                        </el-card>
                    </el-col>
                    <el-col :span="1"/>
                    <el-col :span="1" type="flex" style="margin: 0 auto" class="btn-group-vertical">
                        <el-button class="input-button" style="color: #2c3e50" type="text" icon="el-icon-edit"
                                   @click="editRecord(record.id)"/>
                    </el-col>
                    <el-col :span="1" type="flex" style="margin: 0 auto" class="btn-group-vertical">
                        <el-button class="input-button" style="margin-left: 0; color: red" type="text"
                                   icon="el-icon-delete" @click="deleteRecord(record.id)"/>
                    </el-col>
                </el-row>
                <el-row v-if="edit[record.id]" class="el-row" type="flex" justify="center" align="middle">
                    <el-col :span="22">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="recordArea[record.id]"
                                  style="height: 50px" @input="change($event)">
                        </el-input>
                    </el-col>
                    <el-col :span="1"/>
                    <el-col :span="1" type="flex" style="margin: 0 auto" class="btn-group-vertical">
                        <el-button class="input-button" style="color: #2c3e50" type="text" icon="el-icon-check"
                                   @click="uploadEdit(record.id)"/>
                    </el-col>
                    <el-col :span="1" type="flex" style="margin: 0 auto" class="btn-group-vertical">
                        <el-button class="input-button" style="margin-left: 0; color: red" type="text"
                                   icon="el-icon-close" @click="cancelEditRecord(record.id)"/>
                    </el-col>
                </el-row>
            </el-timeline-item>
        </el-timeline>
        <el-pagination class="mpage"
                       background
                       layout="prev, pager, next"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       @current-change="page"
                       type="flex" justify="center" align="middle"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Record",
        data() {
            return {
                add: false,
                textarea: '',
                edit: {},
                recordArea: {},
                records: {},
                currentPage: 1,
                total: 0,
                pageSize: 5,
                mark: false,
                record: {
                    id: null,
                    content: ''
                }
            }
        },
        methods: {
            page(currentPage) {
                const _this = this;
                console.log("%%%%%%%%%%%%%%%%%%%%%%");
                _this.$axios.get("/records?currentPage=" + currentPage).then(res => {
                    _this.records = res.data.data.records;
                    _this.currentPage = res.data.data.current;
                    _this.total = res.data.data.total;
                    _this.pageSize = res.data.data.size;

                    for (var recordIndex in _this.records) {
                        let singleRecord = _this.records[recordIndex];
                        _this.edit[singleRecord] = false;
                        _this.recordArea[singleRecord.id] = singleRecord.content
                    }
                })
            },
            addRecord() {
                this.add = true;
            },
            uploadAdd() {
                this.record.id = null;
                this.record.content = this.textarea;
                this.record.status = 0;
                const _this = this;
                _this.$axios.post('/record/edit', _this.record)
                    .then(() => {
                        _this.page(1);
                        _this.add = false;
                        _this.textarea = '';
                    })
            },
            cancelAddRecord() {
                this.add = false;
                this.textarea = '';
            },
            deleteRecord(recordId) {
                this.record.id = recordId;
                this.record.content = this.recordArea[recordId];
                this.record.status = 1;
                const _this = this;
                console.log(_this.record);
                _this.$axios.post('/record/edit', _this.record).then(() => {
                    if (_this.total === _this.currentPage * _this.pageSize + 1 - _this.pageSize) {
                        _this.page(_this.currentPage - 1);
                    } else {
                        _this.page(_this.currentPage);
                    }
                    _this.edit[recordId] = false;
                })
            },
            editRecord(recordId) {
                this.edit[recordId] = true;
                this.add = !this.add;
                this.add = !this.add;
            },
            uploadEdit(recordId) {
                this.record.id = recordId;
                this.record.content = this.recordArea[recordId];
                this.record.status = 0;
                const _this = this;
                _this.$axios.post('/record/edit', _this.record).then(() => {
                    _this.page(_this.currentPage);
                    _this.edit[recordId] = false;
                })
            },
            cancelEditRecord(recordId) {
                this.edit[recordId] = false;
                this.add = !this.add;
                this.add = !this.add;
            },
            change(e) {
                this.$forceUpdate()
            }
        },
        created() {
            this.page(1)
        },
    }
</script>

<style scoped>
    .block {
        max-width: 930px;
    }

    .input-button {
        font-size: large;
        color: green;
    }

    .test {
        margin: 0 auto;
    }
</style>