const { Category } = require('../tables/category');
const { Subcategory } = require('../tables/subcategory');
const { Product } = require('../tables/product');

const addNewCategory = async (data) => {
    return await Category.create({
        name: data.name,
    });
};

const getAllCategories = async () => {
    return await Category.findAll({
        attributes: ['category_id', 'name', 'is_deleted'],
        where: {
            is_deleted: false,
        },
    });
};

const getCategory = async (id) => {
    const category = await Category.findByPk(id, {
        attributes: ['category_id', 'name', 'is_deleted'],
    });
    if (!category) {
        throw new Error('Sequelize not found an object!');
    }
    return category;
};

const updateCategory = async (id, data) => {
    await Category.update(
        {
            name: data.name,
        },
        {
            where: { category_id: id },
        }
    );
};

const deleteCategory = async (id) => {
    await Category.update(
        {
            is_deleted: true,
        },
        {
            where: { category_id: id },
        }
    );
    await Subcategory.update(
        {
            is_deleted: true,
        },
        {
            where: { category_id: id },
        }
    );
    // DELETING PRODUCTS
    try {
        const subcategories = await Subcategory.findAll({
            attributes: ['subcategory_id'],
            where: { category_id: id },
        });
        subcategories
            .map((subcategory) => subcategory.subcategory_id)
            .forEach(async (id) => {
                await Product.update(
                    {
                        is_deleted: true,
                    },
                    {
                        where: { subcategory_id: id },
                    }
                );
            });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    addNewCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
