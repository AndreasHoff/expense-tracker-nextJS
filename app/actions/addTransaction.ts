"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface TransactionData {
    text: string;
    amount: number;
}

interface TransactionResult {
    data?: TransactionData;
    error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionResult> {
    const textValue = formData.get('text') as string;
    const amountValue = formData.get('amount') as string;

    if(!textValue || textValue == '' || !amountValue) {
        return {error: 'Text or amount is missing'};
    }

    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue);

    const { userId } = auth();

    if(!userId) {
        return {error: 'User not found'};
    }

    try {
        const transactionData: TransactionData = await db.transaction.create({
            data: {
                text,
                amount,
                userId
            }
        });

        revalidatePath('/');

        return {data: transactionData};
    } catch (error) {
        return {error: 'Error adding transaction'};
    }
}

export default addTransaction;