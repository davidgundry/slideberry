export type Metadata = {
    title: string
    author: string
    slug: string
    summary: string
    hidden?: boolean
    number?: number
    sticky?: boolean
}

export type TopicMetadata = Metadata & {
    module: string
    links?: PageType[]
    learningOutcomes?: LearningOutcome[]
    quote?: string
    quoteAuthor?: string
    prerequisites?: string[]
}

export type PageType = "lectures" | "practicals" | "assessments" | "demos"

export type LearningOutcome = {
    overall: string
    components?: {id :string, text: string}[]
}