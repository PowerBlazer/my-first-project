export const validateTaskData = (req, res, next) => {
    console.log(req.body)
    const { description, status, title } = req.body;

    if(!description || typeof description !== "string"){
        return res.status(400).json({ message: 'Invalid or missind description'})
    }

    next();
}