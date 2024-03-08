-- CreateIndex
CREATE INDEX `fk_lid_idx` ON `transaction`(`log_ID`);

-- RenameIndex
ALTER TABLE `transaction` RENAME INDEX `fk_pid` TO `fk_pid_idx`;
