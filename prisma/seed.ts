import { PrismaClient, UserSex, Day } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ================= ADMIN =================
  await prisma.admin.createMany({
    data: [
      { id: "admin1", username: "admin1" },
      { id: "admin2", username: "admin2" },
    ],
  });

  // ================= GRADE (SINF DARAJASI) =================
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.create({
      data: { level: i },
    });
  }

  // ================= CLASS (SINF) =================
  for (let i = 1; i <= 6; i++) {
    await prisma.class.create({
      data: {
        name: `${i}-A`,
        gradeId: i,
        capacity: Math.floor(Math.random() * 6) + 20, // 20–25
      },
    });
  }

  // ================= SUBJECT (FANLAR) =================
  const subjects = [
    "Matematika",
    "Ona tili",
    "Ingliz tili",
    "Tarix",
    "Geografiya",
    "Fizika",
    "Kimyo",
    "Biologiya",
    "Informatika",
    "Sanʼat",
  ];

  for (const name of subjects) {
    await prisma.subject.create({ data: { name } });
  }

  // ================= TEACHER (O‘QITUVCHI) =================
  for (let i = 1; i <= 15; i++) {
    await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `O‘qituvchi${i}`,
        surname: `Familiya${i}`,
        email: `teacher${i}@school.uz`,
        phone: `+9989012345${i}`,
        address: `Buxoro shahri`,
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        birthday: new Date(
          new Date().setFullYear(new Date().getFullYear() - 30)
        ),
        subjects: { connect: [{ id: (i % 10) + 1 }] },
        classes: { connect: [{ id: (i % 6) + 1 }] },
      },
    });
  }

  // ================= LESSON (DARS) =================
  for (let i = 1; i <= 30; i++) {
    await prisma.lesson.create({
      data: {
        name: `Dars ${i}`,
        day: Object.values(Day)[i % 5],
        startTime: new Date(new Date().setHours(9)),
        endTime: new Date(new Date().setHours(10)),
        subjectId: (i % 10) + 1,
        classId: (i % 6) + 1,
        teacherId: `teacher${(i % 15) + 1}`,
      },
    });
  }

  // ================= PARENT (OTA-ONA) =================
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "O+"];

  for (let i = 1; i <= 25; i++) {
    await prisma.parent.create({
      data: {
        id: `parent${i}`,
        username: `parent${i}`,
        name: `Ota/Ona ${i}`,
        surname: `Familiya${i}`,
        email: `parent${i}@mail.uz`,
        phone: `+9989911122${i}`,
        address: `Viloyat`,
        bloodType: bloodTypes[i % bloodTypes.length],
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
      },
    });
  }

  // ================= STUDENT (O‘QUVCHI) =================
  for (let i = 1; i <= 50; i++) {
    await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: `O‘quvchi${i}`,
        surname: `Familiya${i}`,
        email: `student${i}@school.uz`,
        phone: `+9989333344${i}`,
        address: `Buxoro`,
        bloodType: "O+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        parentId: `parent${Math.ceil(i / 2)}`,
        gradeId: (i % 6) + 1,
        classId: (i % 6) + 1,
        birthday: new Date(
          new Date().setFullYear(new Date().getFullYear() - 10)
        ),
      },
    });
  }

  // ================= EXAM (IMTIHON) =================
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Imtihon ${i}`,
        startTime: new Date(),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        lessonId: (i % 30) + 1,
      },
    });
  }

  // ================= ASSIGNMENT (VAZIFA) =================
  for (let i = 1; i <= 10; i++) {
    await prisma.assignment.create({
      data: {
        title: `Uy vazifa ${i}`,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        lessonId: (i % 30) + 1,
      },
    });
  }

  // ================= RESULT (NATIJA) =================
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: 80 + (i % 20),
        studentId: `student${i}`,
        ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }),
      },
    });
  }

  // ================= ATTENDANCE (DAVOMAT) =================
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        studentId: `student${i}`,
        lessonId: (i % 30) + 1,
      },
    });
  }

  // ================= EVENT (TADBIR) =================
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Maktab tadbiri ${i}`,
        description: `Tadbir tavsifi ${i}`,
        startTime: new Date(),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        classId: (i % 6) + 1,
      },
    });
  }

  // ================= ANNOUNCEMENT (EʼLON) =================
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Eʼlon ${i}`,
        description: `Muhim eʼlon ${i}`,
        date: new Date(),
        classId: (i % 6) + 1,
      },
    });
  }

  console.log("✅ Seed muvaffaqiyatli yakunlandi");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
