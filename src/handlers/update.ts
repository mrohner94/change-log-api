import prisma from "../modules/db"

export const getOneUpdate = async (req, res) => {
    const update = prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({data: update})
}

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, products) => {
        return [...allUpdates, ...products.updates]
    }, [])

    res.json({data: updates});
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if(!product) {
        // does not belong to user
        res.json({message: 'nope'})
    }

    const update = await prisma.update.create({
        data: req.body
    })

    res.json({data: update})
}
export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, products) => {
        return [...allUpdates, ...products.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if(!match) {
        return res.json({message: 'Failed update'})
    }
    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({data: updatedUpdate})
}
export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, products) => {
        return [...allUpdates, ...products.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if(!match) {
        return res.json({message: 'Failed update'})
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({data: deleted})
}