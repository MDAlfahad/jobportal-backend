-- ─────────────────────────────────────────────────────────────
-- Database dump: `hyphuntechnology`
-- Generator: db-connect
-- ─────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS `hyphuntechnology`;
USE `hyphuntechnology`;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `hyphuntechnology`.`job_applications`;
CREATE TABLE `hyphuntechnology`.`job_applications` (
    `id` int AUTO_INCREMENT,
    `application_id` varchar(255),
    `job_id` varchar(255),
    `student_id` varchar(255),
    `company_id` varchar(255),
    `user_name` varchar(255),
    `user_email` varchar(255),
    `company_name` varchar(255),
    `experience` varchar(255),
    `job_desigination` varchar(255),
    `availability` varchar(100),
    `travel` varchar(255),
    `user_contact` varchar(255),
    `resume_path` varchar(255),
    `applied_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `status` enum('pending','accepted','rejected') DEFAULT pending,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE UNIQUE INDEX `PRIMARY` ON `hyphuntechnology`.`job_applications` (`id`);
CREATE INDEX `job_id` ON `hyphuntechnology`.`job_applications` (`job_id`);
CREATE INDEX `student_id` ON `hyphuntechnology`.`job_applications` (`student_id`);

INSERT INTO `hyphuntechnology`.`job_applications` (`id`, `application_id`, `job_id`, `student_id`, `company_id`, `user_name`, `user_email`, `company_name`, `experience`, `job_desigination`, `availability`, `travel`, `user_contact`, `resume_path`, `applied_at`, `status`) VALUES (9, 'ae299bb5-7fc6-4c08-8be0-13d1f2c2358d', 'e3cec240-dd65-4c5d-a4ab-f32ceb84a7de', '17a6cdf5-f7bc-4c3c-a17e-9cf6ea834e85', '921618f0-2337-4cee-8bc3-becd0807a77b', 'Md alfahad', 'alfahadkhan715@gmail.com', 'TechOwear Nexcircuit pvt.ltd', '1', 'Frontend Developer', 'immediate', 'yes', '', 'data_1777031560298.pdf', '2026-04-24 11:52:40 UTC', 'accepted');

DROP TABLE IF EXISTS `hyphuntechnology`.`job_postdata`;
CREATE TABLE `hyphuntechnology`.`job_postdata` (
    `id` int AUTO_INCREMENT,
    `job_id` char(36),
    `company_email` varchar(255),
    `job_desigination` varchar(200),
    `company_name` varchar(200),
    `job_location` varchar(255),
    `location_type` varchar(255),
    `job_workingtype` varchar(100),
    `job_type` varchar(255),
    `job_startdate` varchar(200),
    `job_ctc` varchar(200),
    `job_experience` varchar(200),
    `Job_lastdate` varchar(200),
    `certifications` varchar(255),
    `job_vacancies` int,
    `job_offering` varchar(255),
    `job_description` text,
    `job_skills` varchar(200),
    `about_company` text,
    `job_requirements` text,
    `posted_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `user_id` text,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE UNIQUE INDEX `PRIMARY` ON `hyphuntechnology`.`job_postdata` (`id`);
CREATE UNIQUE INDEX `job_id` ON `hyphuntechnology`.`job_postdata` (`job_id`);
CREATE UNIQUE INDEX `job_id_2` ON `hyphuntechnology`.`job_postdata` (`job_id`);

INSERT INTO `hyphuntechnology`.`job_postdata` (`id`, `job_id`, `company_email`, `job_desigination`, `company_name`, `job_location`, `location_type`, `job_workingtype`, `job_type`, `job_startdate`, `job_ctc`, `job_experience`, `Job_lastdate`, `certifications`, `job_vacancies`, `job_offering`, `job_description`, `job_skills`, `about_company`, `job_requirements`, `posted_at`, `user_id`) VALUES (1, 'e3cec240-dd65-4c5d-a4ab-f32ceb84a7de', 'techowear@gmail.com', 'Frontend Developer', 'TechOwear Nexcircuit pvt.ltd', 'Bhilai Nagar', 'remote', 'workFromHome', 'remote', '2026-04-05', '10,000-20,000', 'anyone can apply', '2026-04-06', 'backend developer, mern stack, full stack,', 20, '', 'this is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job post', 'java, C++, react, nodejs, html, css, js', 'this is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job post', 'this is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job post', '2026-04-06 08:48:04 UTC', '921618f0-2337-4cee-8bc3-becd0807a77b');
INSERT INTO `hyphuntechnology`.`job_postdata` (`id`, `job_id`, `company_email`, `job_desigination`, `company_name`, `job_location`, `location_type`, `job_workingtype`, `job_type`, `job_startdate`, `job_ctc`, `job_experience`, `Job_lastdate`, `certifications`, `job_vacancies`, `job_offering`, `job_description`, `job_skills`, `about_company`, `job_requirements`, `posted_at`, `user_id`) VALUES (2, '11c15c82-3db3-43b5-ba5b-fc3a54be542b', 'alfahadkhan1950@gmail.com', 'Backend Developer', 'hyphun technology', 'Ambikapur', 'remote', 'workFromHome', 'workFromHome', '2026-04-06', '10,000-20,000', '1 year', '2026-04-30', 'backend developer, mern stack, full stack,', 30, '6', 'this is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job post', 'java, C++, react, nodejs, html, css, js', 'this is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job post', 'this is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job postthis is just a demo company job post', '2026-04-06 08:49:55 UTC', '921618f0-2337-4cee-8bc3-becd0807a77b');

DROP TABLE IF EXISTS `hyphuntechnology`.`user_details`;
CREATE TABLE `hyphuntechnology`.`user_details` (
    `id` int AUTO_INCREMENT,
    `user_id` text,
    `user_name` varchar(200),
    `user_email` varchar(255),
    `user_contact` text,
    `user_address` text,
    `user_skills` varchar(200),
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE UNIQUE INDEX `PRIMARY` ON `hyphuntechnology`.`user_details` (`id`);

INSERT INTO `hyphuntechnology`.`user_details` (`id`, `user_id`, `user_name`, `user_email`, `user_contact`, `user_address`, `user_skills`, `created_at`) VALUES (1, '8bd516f7-f257-43a4-afe4-fc1878a85d13', 'Md alfahad', 'Md alfahad', '6260379325', 'Bhilai', NULL, '2026-04-06 10:16:28 UTC');

DROP TABLE IF EXISTS `hyphuntechnology`.`user_logindata`;
CREATE TABLE `hyphuntechnology`.`user_logindata` (
    `id` int AUTO_INCREMENT,
    `user_id` char(36),
    `user_name` varchar(100),
    `user_email` varchar(200),
    `user_password` text NOT NULL,
    `user_phone` varchar(200),
    `user_status` varchar(100),
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `auth_role` varchar(50),
    `company_id` int,
    `user_address` text,
    `user_image` varchar(255),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE UNIQUE INDEX `PRIMARY` ON `hyphuntechnology`.`user_logindata` (`id`);
CREATE UNIQUE INDEX `user_email` ON `hyphuntechnology`.`user_logindata` (`user_email`);
CREATE UNIQUE INDEX `user_id` ON `hyphuntechnology`.`user_logindata` (`user_id`);
CREATE UNIQUE INDEX `user_id_2` ON `hyphuntechnology`.`user_logindata` (`user_id`);

INSERT INTO `hyphuntechnology`.`user_logindata` (`id`, `user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_status`, `created_at`, `auth_role`, `company_id`, `user_address`, `user_image`) VALUES (5, '3621987d-2bad-466b-b9d2-4828936ac27b', 'root', 'root@gmail.com', '$2b$12$HJo52y1znRmpRcRVI32xyucF8EnBbDkZVSauF74zYHnul05dJ5NsG', NULL, '1', '2026-03-27 10:09:56 UTC', 'admin', NULL, NULL, NULL);
INSERT INTO `hyphuntechnology`.`user_logindata` (`id`, `user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_status`, `created_at`, `auth_role`, `company_id`, `user_address`, `user_image`) VALUES (6, '17a6cdf5-f7bc-4c3c-a17e-9cf6ea834e85', 'Md alfahad', 'alfahadkhan715@gmail.com', '$2b$12$HJo52y1znRmpRcRVI32xyucF8EnBbDkZVSauF74zYHnul05dJ5NsG', NULL, '1', '2026-03-27 10:47:05 UTC', 'user', 103, NULL, '1777277747359.jpg');
INSERT INTO `hyphuntechnology`.`user_logindata` (`id`, `user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_status`, `created_at`, `auth_role`, `company_id`, `user_address`, `user_image`) VALUES (8, '921618f0-2337-4cee-8bc3-becd0807a77b', 'company', 'company@gmail.com', '$2b$12$X0X4PQfLQW8uyoQVtjBj5uHefcTE70DTrbmTz9CxnQK9ukPEkj9jq', '', '1', '2026-03-31 08:45:13 UTC', 'company', 102, '', '1777028853762.png');
INSERT INTO `hyphuntechnology`.`user_logindata` (`id`, `user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_status`, `created_at`, `auth_role`, `company_id`, `user_address`, `user_image`) VALUES (9, 'e21bb48c-6327-42ee-8c13-6323d2e83b43', 'company2', 'company2@gmail.com', '$2b$12$J7QTm8s1gr.bR0NBXCFt2eiH8F28V5sd36d.nxhSVNzHoL1K1jV7G', '8408908993', '1', '2026-03-31 08:47:24 UTC', 'company', 101, NULL, NULL);
INSERT INTO `hyphuntechnology`.`user_logindata` (`id`, `user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_status`, `created_at`, `auth_role`, `company_id`, `user_address`, `user_image`) VALUES (12, '061dc881-e0d2-4e81-8811-ae4431b5fe51', 'hyphun technology', 'alfahadkhan1950@gmail.com', '$2b$12$xA.IHbQeeUiYfr8pPjxxruDg5wa.Nv9RTuWZnEraHqNiYVj2EA2im', '6644255449', '1', '2026-04-01 11:44:09 UTC', 'company', NULL, NULL, NULL);
INSERT INTO `hyphuntechnology`.`user_logindata` (`id`, `user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_status`, `created_at`, `auth_role`, `company_id`, `user_address`, `user_image`) VALUES (13, '154481da-4cd1-4beb-be82-4d571d086aa6', 'Techowear NexCircuit Pvt.ltd', 'techowear@gmail.com', '$2b$12$UdXzhpwedh5w3V7ge93uR.Qz2luC.faFKNe0advVe22DWC5fh7BHq', '098765432233', '1', '2026-04-03 12:21:00 UTC', 'company', NULL, NULL, NULL);
INSERT INTO `hyphuntechnology`.`user_logindata` (`id`, `user_id`, `user_name`, `user_email`, `user_password`, `user_phone`, `user_status`, `created_at`, `auth_role`, `company_id`, `user_address`, `user_image`) VALUES (14, 'e1f447ac-37f3-40a9-a9b2-ceb3019f1b44', 'TechOwear NexCircuit pvt.ltd', 'techowearnexcircuit@gmail.com', '$2b$12$XJHGJ4WTY6OUNUDYWwCw7.WR4xuI2uPCPsGGlWthmwI2RCifhWOVy', '8408908993', '1', '2026-04-08 10:10:32 UTC', 'company', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS=1;

ALTER TABLE `hyphuntechnology`.`job_applications` ADD CONSTRAINT `job_applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `hyphuntechnology`.`job_postdata` (`job_id`);
ALTER TABLE `hyphuntechnology`.`job_applications` ADD CONSTRAINT `job_applications_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `hyphuntechnology`.`user_logindata` (`user_id`);

