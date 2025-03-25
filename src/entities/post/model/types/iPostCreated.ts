interface iPostCreated {
    title: string,
    content: string,
    prewiew: string | null,
    status: "open" | "byTier",
}

export default iPostCreated;