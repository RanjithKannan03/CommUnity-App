'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function update(path) {
    console.log(path);
    if (path != null) {
        revalidatePath(path);
        redirect(path);
    }
}

export async function reload(path) {
    revalidatePath(path);
}


