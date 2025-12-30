"use server";
import { StudentSchema } from "./../components/forms/StudentForm";

import { createClerkClient } from "@clerk/nextjs/server";
import prisma from "./prisma";
import { ClassSchema } from "@/components/forms/ClassForm";
import { SubjectSchema } from "@/components/forms/SubjectForm";
import { TeacherSchema } from "@/components/forms/TeacherFrom";
const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});
// Fanlarni yaratish
export async function createSubject(data: SubjectSchema) {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({
            id: teacherId,
          })),
        },
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
// Fanlarni yangilash
export async function updateSubject(data: SubjectSchema) {
  try {
    await prisma.subject.update({
      where: { id: data.id },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
// Fanlarni o'chirish
export async function deleteSubject(data: { id: number }) {
  try {
    await prisma.subject.delete({
      where: {
        id: data.id,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// Sinf yaratish
export async function createClass(data: ClassSchema) {
  try {
    await prisma.class.create({
      data,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
// Sinfni yangilash
export async function updateClass(data: ClassSchema) {
  try {
    await prisma.class.update({
      where: { id: data.id },
      data,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
// Sinfni o'chirish
export async function deleteClass(data: { id: number }) {
  try {
    await prisma.class.delete({
      where: {
        id: data.id,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// O'Oqituvchi yaratish
export const createTeacher = async (data: TeacherSchema) => {
  try {
    const user = await clerk.users.createUser({
      username: data.username,
      firstName: data.name,
      lastName: data.surname,
      password: data.password,
      publicMetadata: { role: "teacher" },
    });

    if (!user?.id) {
      throw new Error("Clerk user yaratilmadi");
    }
    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((id) => ({
            id: Number(id),
          })),
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("CREATE TEACHER ERROR:", error);
    return { success: false };
  }
};
// Oqituvchi update
export const updateTeacher = async (data: TeacherSchema) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    const user = await clerk.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Oqituvchi delete
export async function deleteTeacher(data: { id: string }) {
  try {
    await prisma.teacher.delete({
      where: {
        id: data.id,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("DeleteTeacher error:", error);
    return { success: false };
  }
}

// Studentlarni yaratish
export const createStudent = async (data: StudentSchema) => {
  try {
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true };
    }

    const user = await clerk.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });

    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
export const updateStudent = async (data: StudentSchema) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    const user = await clerk.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
