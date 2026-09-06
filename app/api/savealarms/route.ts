import { NextResponse } from "next/server";
import savedalarms from "../../database/page";

export async function POST(request: Request) {
    const { hours, minutes, selected, days, meridian } = await request.json();

    const result = await savedalarms.query(
        "INSERT INTO alarm (hours,minutes,selected,days,meridian) VALUES (?,?,?,?,?)",
        [hours, minutes, selected, JSON.stringify(days),meridian]
    );
    return NextResponse.json({
        id: (result as any).insertId,
        hours,
        minutes,
        selected,
        days,
        meridian,
    });

}

export async function GET() {
    const [rows] = await savedalarms.query(
        "SELECT * FROM alarm ORDER BY id DESC"
    );

    const alarms = (rows as any[]).map(row => ({
        ...row,
        days: JSON.parse(row.days)
    }))
    return NextResponse.json(alarms);
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    await savedalarms.query("Delete from alarm where id=?", [id]);
    return NextResponse.json({ message: "alloo" });
}

export async function PUT(request: Request) {
    const { id, selected, days, hours, minutes, meridian } = await request.json();

    if (days !== undefined) {
        await savedalarms.query(
            "UPDATE alarm SET days=? WHERE id=?",
            [JSON.stringify(days), id]
        );
    }

    else if (selected !== undefined) {
        await savedalarms.query("UPDATE ALARM SET SELECTED=? wHERE ID=?", [selected, id]);
    }

    else if (hours !== undefined && minutes !== undefined && meridian !== undefined) {
        await savedalarms.query("UPDATE ALARM SET HOURS=?, MINUTES=? , meridian=? WHERE ID =?", [hours, minutes,meridian, id])
    }


    return NextResponse.json({
        message: "updated",
        days,
    });
}

