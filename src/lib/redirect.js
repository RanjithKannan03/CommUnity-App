'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function update(path) {
    console.log(path);
    revalidatePath(path);
    redirect(path);
}


