-- CreateIndex
CREATE INDEX `fk_log_id_idx` ON `admin_user_log`(`log_ID`);

-- RenameIndex
ALTER TABLE `admin_user_log` RENAME INDEX `fk_alog_uid` TO `fk_tgt_uid_idx`;

-- RenameIndex
ALTER TABLE `log` RENAME INDEX `fk_alog_uid` TO `fk_alog_uid_idx`;

-- RenameIndex
ALTER TABLE `log` RENAME INDEX `fl_log_type` TO `fl_log_type_idx`;
