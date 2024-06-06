import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const cacheBuster = `cache=${Date.now()}`;

        const res = await fetch(`${process.env.BASE_URL}/auth/forgot_password/?${cacheBuster}`, {
            method: 'POST',
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        // https://ajiroba.onrender.com/v1/auth/verify_reset_password_code/

        // Parse response body as JSON
        const data = await res.json();
        const status = res.status;

        // Return JSON response with data and status
        return NextResponse.json({ data, status });
    } catch (error) {
        // Handle any errors gracefully
        console.error('Error processing request:', error.message);
        return NextResponse.error(new Error('Internal Server Error'));
    }
}
