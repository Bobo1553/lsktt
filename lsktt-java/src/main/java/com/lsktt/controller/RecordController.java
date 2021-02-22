package com.lsktt.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lsktt.common.lang.Result;
import com.lsktt.entity.Record;
import com.lsktt.service.RecordService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 关注公众号：MarkerHub
 * @since 2021-02-21
 */
@RestController
public class RecordController {

    @Autowired
    RecordService recordService;

    @GetMapping("/records")
    public Result list(@RequestParam(defaultValue = "1") Integer currentPage) {
        Page page = new Page(currentPage, 5);
        IPage pageData = recordService.page(page, new QueryWrapper<Record>().eq("status",0).orderByDesc("created"));
        return Result.success(pageData);
    }

    @GetMapping("/record/{id}")
    public Object test(@PathVariable("id") Long id) {
        return recordService.getById(id);
    }

    @PostMapping("/record/edit")
    public Result edit(@Validated @RequestBody Record record) {

        Record tempRecord;
        if (record.getId() != null) {
            tempRecord = recordService.getById(record.getId());
        } else {
            tempRecord = new Record();
            tempRecord.setCreated(LocalDateTime.now());
            tempRecord.setStatus(0);
        }

        BeanUtils.copyProperties(record, tempRecord, "id", "created");
        recordService.saveOrUpdate(tempRecord);

        return Result.success(null);
    }

}
