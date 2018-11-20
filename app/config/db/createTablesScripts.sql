--
-- table structure for table areas
--

drop table if exists areas;
create table areas (
  id int(11) not null auto_increment,
  name varchar(255) not null,
  created_at datetime default null,
  updated_at datetime default null,
  constraint pk_areas primary key(id)
) engine=InnoDB;

--
-- table structure for table subareas
--

drop table if exists subareas;
create table subareas (
  id int(11) not null auto_increment,
  area_id int(11) not null,
  name varchar(255) not null,
  created_at datetime default null,
  updated_at datetime default null,
  constraint pk_subareas primary key(id)
) engine=InnoDB;

alter table subareas
add constraint fk_subarea_area
foreign key (area_id) references areas(id);

--
-- table structure for table users
--

drop table if exists users;
create table users (
  id int(11) not null auto_increment,
  name varchar(255) default null,
  username text,
  about text,
  email varchar(255) default null,
  password varchar(255) not null,
  last_login datetime default null,
  status enum('active','inactive') default 'active',
  createdat datetime not null,
  updatedat datetime not null,
  constraint pk_users primary key(id)
) engine=InnoDB;

--
-- table structure for table administrators
--

drop table if exists administrators;
create table administrators (
  id int(11) not null auto_increment,
  email varchar(255) default null,
  name varchar(255) default null,
  password varchar(255) default null,
  created_at datetime default null,
  updated_at datetime default null,
  user_id int(11) not null,
  constraint pk_administrators primary key(id)
) engine=InnoDB;

alter table administrators
add constraint fk_administrators_users
foreign key (user_id) references users(id);

--
-- table structure for table coordinators
--

drop table if exists coordinators;
create table coordinators (
  id int(11) not null auto_increment,
  area_id int(11) not null,
  email varchar(255) not null,
  name varchar(255) not null,
  password varchar(255) not null,
  active tinyint(1) default '1',
  created_at datetime default null,
  updated_at datetime default null,
  user_id int(11) not null,
  constraint pk_coordinators primary key(id)
) engine=InnoDB;

alter table coordinators
add constraint fk_coordinators_users
foreign key (user_id) references users(id);

alter table coordinators
add constraint fk_coordinators_areas
foreign key (area_id) references areas(id);

--
-- table structure for table professors
--

drop table if exists professors;
create table professors (
  id int(11) not null auto_increment,
  email varchar(255) not null,
  name varchar(255) not null,
  password varchar(255) not null,
  active tinyint(1) default '1',
  created_at datetime default null,
  updated_at datetime default null,
  user_id int(11) not null,
  constraint pk_professors primary key(id)
) engine=InnoDB;

alter table professors
add constraint fk_professors_users
foreign key (user_id) references users(id);

--
-- table structure for table professor_subareas
--

drop table if exists professor_subareas;
create table professor_subareas (
  id int(11) not null auto_increment,
  professor_id int(11) not null,
  subarea_id int(11) not null,
  created_at datetime default null,
  updated_at datetime default null,
  constraint pk_professor_subareas primary key(id)
) engine=InnoDB;

alter table professor_subareas
add constraint fk_professorsubareas_professors
foreign key (professor_id) references professors(id);

alter table professor_subareas
add constraint fk_professorsubareas_subareas
foreign key (subarea_id) references subareas(id);

--
-- table structure for table profiles
--

drop table if exists profiles;
create table profiles (
  id int(11) not null auto_increment,
  type varchar(255) default null,
  created_at datetime default null,
  updated_at datetime default null,
  constraint pk_profiles primary key(id)
) engine=InnoDB;

--
-- table structure for table students
--

drop table if exists students;
create table students (
  id int(11) not null auto_increment,
  profile_id int(11) not null,
  email varchar(255) default null,
  name varchar(255) default null,
  password varchar(255) default null,
  active tinyint(1) default '1',
  created_at datetime default null,
  updated_at datetime default null,
  user_id int(11) not null,
  constraint pk_students primary key(id)
) engine=InnoDB;

alter table students
add constraint fk_students_profiles
foreign key (profile_id) references profiles(id);

alter table students
add constraint fk_students_users
foreign key (user_id) references users(id);

--
-- table structure for table practise_exams
--

drop table if exists practise_exams;
create table practise_exams (
  id int(11) not null auto_increment,
  name varchar(255) not null,
  is_aob_exam tinyint(1) default '0',
  aob_exam_year int(11) default null,
  aob_exam_serial int(11) default null,
  created_at datetime default null,
  updated_at datetime default null,
  constraint pk_practise_exams primary key(id)
) engine=InnoDB;

--
-- table structure for table questions
--

drop table if exists questions;
create table questions (
  id int(11) not null auto_increment,
  professor_id int(11) not null,
  coordinator_id int(11) not null,
  subarea_id int(11) not null,
  statement longtext not null,
  right_alternative char(1) not null,
  approved tinyint(1) default null,
  studymaterials varchar(255) default null,
  comment varchar(255) not null,
  created_at datetime default null,
  updated_at datetime default null,
  constraint pk_questions primary key(id)
) engine=InnoDB;

alter table questions
add constraint fk_questions_subareas
foreign key (subarea_id) references subareas(id);

alter table questions
add constraint fk_questions_professors
foreign key (professor_id) references professors(id);

alter table questions
add constraint fk_questions_coordinators
foreign key (coordinator_id) references coordinators(id);

--
-- table structure for table alternatives
--

drop table if exists alternatives;
create table alternatives (
  id int(11) not null auto_increment,
  question_id int(11) not null,
  professor_id int(11) not null,
  letter char(1) not null,
  description longtext not null,
  correct tinyint(1) default '0',
  created_at datetime default null,
  updated_at datetime default null,
  constraint pk_alternatives primary key(id)
) engine=InnoDB;

alter table alternatives
add constraint fk_alternatives_questions
foreign key (question_id) references questions(id);

alter table alternatives
add constraint fk_alternatives_professors
foreign key (professor_id) references professors(id);

--
-- table structure for table practiseexam_questions
--

drop table if exists practiseexam_questions;
create table practiseexam_questions (
  id int(11) not null auto_increment,
  question_id int(11) not null,
  practise_exam_id int(11) not null,
  serial_number int(11) not null,
  created_at datetime default null,
  updated_at datetime default null,
  constraint pk_practiseexam_questions primary key(id)
) engine=InnoDB;

alter table practiseexam_questions
add constraint fk_practiseexamquestions_questions
foreign key (question_id) references questions(id);

alter table practiseexam_questions
add constraint fk_practiseexamquestions_practiseexams
foreign key (practise_exam_id) references practise_exams(id);

--
-- table structure for table participations
--

drop table if exists participations;
create table participations (
  id int(11) not null auto_increment,
  practise_exam_id int(11) not null,
  student_id int(11) not null,
  participation_date datetime default null,
  time_of_conclusion time default null,
  numberofquestions int(11) default null,
  numberofcorrectanswers int(11) default null,
  numberofwronganswers int(11) default null,
  hitratio decimal(10,0) default null,
  created_at datetime default null,
  updated_at datetime default null,
  constraint pk_participations primary key(id)
) engine=InnoDB;

alter table participations
add constraint fk_participations_practiseexams
foreign key (practise_exam_id) references practise_exams(id);

alter table participations
add constraint fk_participations_students
foreign key (student_id) references students(id);

--
-- table structure for table answers
--

drop table if exists answers;
create table answers (
  id int(11) not null auto_increment,
  question_id int(11) not null,
  participation_id int(11) not null,
  alternative_id int(11) not null,
  created_at datetime default null,
  updated_at datetime default null,
  time_to_answer int(11) default '0',
  constraint pk_answers primary key(id)
) engine=InnoDB;

alter table answers
add constraint fk_answers_participations
foreign key (participation_id) references participations(id);

alter table answers
add constraint fk_answers_questions
foreign key (question_id) references questions(id);

alter table answers
add constraint fk_answers_alternatives
foreign key (alternative_id) references alternatives(id);
