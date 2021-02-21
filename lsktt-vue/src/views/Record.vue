<template>
    <div class="block">
        <el-timeline>
            <el-timeline-item color="#2c3e50">
                <el-button v-if="!add" type="info" icon="el-icon-plus" circle @click="addRecord"/>
                <el-row v-if="add" class="el-row" type="flex" justify="center" align="middle">
                    <el-col :span="22">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" style="height: 50px">
                        </el-input>
                    </el-col>
                    <el-col :span="1"/>
                    <el-col :span="1" type="flex" style="margin: 0 auto" class="btn-group-vertical">
                        <el-button class="input-button" style="color: #2c3e50" type="text" icon="el-icon-check"/>
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
                            <h4>{{ record.description }}</h4>
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
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="record.description"
                                  style="height: 50px">
                        </el-input>
                    </el-col>
                    <el-col :span="1"/>
                    <el-col :span="1" type="flex" style="margin: 0 auto" class="btn-group-vertical">
                        <el-button class="input-button" style="color: #2c3e50" type="text" icon="el-icon-check" @click="uploadEdit(record.id)"/>
                    </el-col>
                    <el-col :span="1" type="flex" style="margin: 0 auto" class="btn-group-vertical">
                        <el-button class="input-button" style="margin-left: 0; color: red" type="text"
                                   icon="el-icon-close" @click="cancelEditRecord(record.id)"/>
                    </el-col>
                </el-row>
            </el-timeline-item>
        </el-timeline>
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
                records: {},
                currentPage: 1,
                total: 0,
                pageSize: 5,
                mark: false,
            }
        },
        methods: {
            page(currentPage) {
                const _this = this;
                this.$axios.get("/blogs?currentPage=" + currentPage).then(res => {
                    console.log(res);
                    _this.records = res.data.data.records;
                    _this.currentPage = res.data.data.current;
                    _this.total = res.data.data.total;
                    _this.pageSize = res.data.data.size;

                    for (singleRecord in _this.records) {
                        _this.edit[singleRecord.id] = false;
                    }
                })
            },
            addRecord() {
                this.add = true;
            },
            cancelAddRecord() {
                this.add = false;
            },
            deleteRecord(recordId) {

            },
            editRecord(recordId) {
                this.edit[recordId] = true;
                this.add = !this.add;
                this.add = !this.add;
            },
            uploadEdit(recordId) {},
            cancelEditRecord(recordId) {
                this.edit[recordId] = false;
                this.add = !this.add;
                this.add = !this.add;
            },
        },
        created() {
            this.page(1)
        }
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
</style>