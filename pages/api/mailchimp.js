import crypto from "crypto";

export default async function handler(req, res) {
    console.log(req.body);
    if (req.method === "POST") {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required" });
        }

        const API_KEY = process.env.NEXT_MAILCHIMP_API;
        const LIST_ID = process.env.NEXT_LIST_ID;
        const SERVER_PREFIX = process.env.NEXT_SERVER_PREFIX;

        try {
            const data = {
                members: [
                    {
                        email_address: email,
                        status: "subscribed",
                        merge_fields: {
                            FNAME: name.split(" ")[0],
                            LNAME: name.split(" ")[1],
                        },
                    },
                ],
                update_existing: true, // This will update the contact if it already exists
            };

            const response = await fetch(`https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${LIST_ID}`, {
                method: "POST",
                headers: {
                    Authorization: `apikey ${API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Mailchimp response:", result); // Log the response for debugging

            if (response.ok) {
                res.status(200).json({ message: "Successfully subscribed!" });
                console.log("OKOKOKO");
            } else {
                console.error("Mailchimp error:", result);
                res.status(400).json({ error: result.title || "An error occurred" });
            }
        } catch (error) {
            console.error("Server error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
