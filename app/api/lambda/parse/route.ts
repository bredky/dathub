import { NextResponse } from "next/server"
import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("notebook") as File

  if (!file) {
    return NextResponse.json({ error: "No notebook uploaded" }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const json = JSON.parse(buffer.toString("utf-8"))

  const codeCells = json.cells
    .filter((cell: any) => cell.cell_type === "code")
    .map((cell: any) => cell.source.join(""))
    .join("\n\n")

  const prompt = `
You are Lambda, an AI that parses data science notebooks. Here is a notebook's code:

${codeCells}

Extract and return the following as JSON:
- model_type
- input_data_file
- metrics_used (e.g., accuracy_score)
- tunable_parameters (name, value, if it's tunable)
- brief_summary (2-line summary)
`.trim()

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  })

  const structuredResponse = completion.choices[0].message.content
  return NextResponse.json({ parsed: structuredResponse })
}
