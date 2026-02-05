-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `form_name` VARCHAR(191) NOT NULL,
    `form_description` VARCHAR(191) NULL,
    `user_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `form_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `form_id` INTEGER NOT NULL,
    `form_content_description` VARCHAR(191) NOT NULL,
    `order` INTEGER NULL,
    `required` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `survey_record` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `contact_no` VARCHAR(191) NULL,
    `datetime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assisting_staff` VARCHAR(191) NULL,
    `form_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `survey_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `survey_id` INTEGER NOT NULL,
    `form_content_id` INTEGER NULL,
    `rating` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `forms` ADD CONSTRAINT `forms_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `form_content` ADD CONSTRAINT `form_content_form_id_fkey` FOREIGN KEY (`form_id`) REFERENCES `forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `survey_record` ADD CONSTRAINT `survey_record_form_id_fkey` FOREIGN KEY (`form_id`) REFERENCES `forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `survey_content` ADD CONSTRAINT `survey_content_survey_id_fkey` FOREIGN KEY (`survey_id`) REFERENCES `survey_record`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `survey_content` ADD CONSTRAINT `survey_content_form_content_id_fkey` FOREIGN KEY (`form_content_id`) REFERENCES `form_content`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
