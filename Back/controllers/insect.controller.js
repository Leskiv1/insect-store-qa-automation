import Insect from '../models/insect.js';

class InsectController {
    async createInsect(req, res) {
        const { name, speed, mass } = req.body;

        // Очищення пробілів і переведення імені до нижнього регістру
        const cleanName = name.trim();

        try {
            // Перевіряємо, чи існує вже така комаха з таким ім'ям
            const existingInsect = await Insect.findOne({ where: { name: cleanName } });

            if (existingInsect) {
                return res.status(400).json({ message: 'Insect with this name already exists' });
            }

            // Створення нової картки
            const newInsect = await Insect.create({ name: cleanName, speed, mass });

            return res.status(200).json(newInsect);
        } catch (error) {
            console.error('Error inserting data:', error.message);
            return res.status(500).json({ message: 'Error inserting data' });
        }
    }

    async getInsects(req, res) {
        const { name, sort } = req.query;

        try {
            const insects = await Insect.findAll();

            let sortedInsects = insects.filter(insect => 
                insect.name.toLowerCase().includes(name.trim().toLowerCase())
            );

            if (sort === 'descending') {
                sortedInsects.sort((a, b) => a.speed - b.speed);
            }
            if (sort === 'ascending') {
                sortedInsects.sort((a, b) => b.speed - a.speed);
            }

            return res.status(200).json(sortedInsects);

        } catch (error) {
            console.error('Error fetching insects:', error.message);
            return res.status(500).json({ message: 'Error fetching insects' });
        }
    }

    async updateInsect(req, res) {
        const { id } = req.params;
        const fieldsToUpdate = req.body;

        // Якщо є ім'я в даних для оновлення, очищаємо його
        if (fieldsToUpdate.name) {
            fieldsToUpdate.name = fieldsToUpdate.name.trim();
        }

        const updateFields = Object.entries(fieldsToUpdate).reduce((acc, [key, value]) => {
            if (value !== null && value !== undefined) {
                acc[key] = value;
            }
            return acc;
        }, {});

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No valid fields to update' });
        }

        try {
            const result = await Insect.update(updateFields, {
                where: { id }
            });

            if (result === 0) {
                return res.status(404).json({ message: 'Insect not found' });
            } else {
                return res.status(200).json({ message: 'Insect updated successfully' });
            }

        } catch (error) {
            console.error('Error updating data:', error.message);
            return res.status(500).json({ message: 'Error updating data' });
        }
    }

    async deleteInsect(req, res) {
        const { id } = req.params;

        try {
            const result = await Insect.destroy({
                where: { id }
            });

            if (result === 0) {
                return res.status(404).json({ message: 'Insect not found' });
            } else {
                return res.status(200).json({ message: 'Insect deleted successfully' });
            }
        } catch (error) {
            console.error('Error deleting data:', error.message);
            return res.status(500).json({ message: 'Error deleting data' });
        }
    }

    async countWeight(req, res) {
        const { name, sort } = req.query;
    
        try {
            // Отримання всіх комах з бази даних
            const insects = await Insect.findAll();
    
            // Фільтрація за ім'ям (якщо є)
            let filteredInsects = insects.filter(insect => 
                insect.name.toLowerCase().includes(name.trim().toLowerCase())
            );
    
            // Сортування за швидкістю, якщо вказано
            if (sort === 'descending') {
                filteredInsects.sort((a, b) => b.speed - a.speed);
            } else if (sort === 'ascending') {
                filteredInsects.sort((a, b) => a.speed - b.speed);
            }
    
            // Обчислення загальної маси
            const totalWeight = filteredInsects.reduce((sum, insect) => sum + +insect.mass, 0);

    
            // Повернення відповіді з загальною масою
            return res.status(200).json({ totalWeight });
        } catch (error) {
            console.error('Error calculating total weight:', error.message);
            return res.status(500).json({ message: 'Error calculating total weight' });
        }
    }
}
    

export default new InsectController();
