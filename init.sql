SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS insect (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    batches INT,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO insect (id, name, type, batches, price, description) VALUES
(1, 'Монарх королівський', 'butterfly', 25, 180.00, 'Ефектний метелик з яскраво-помаранчевими крилами та чорними прожилками.'),
(2, 'Бджола медоносна', 'bee', 50, 1200.00, 'Працьовита комаха, незамінна для запилення саду та виробництва меду.'),
(3, 'Сонечко семикрапкове', 'ladybug', 100, 150.50, 'Корисний жук для природної боротьби з попелицею на вашій ділянці.'),
(4, 'Павичеве око', 'butterfly', 15, 210.00, 'Має унікальний візерунок у вигляді "очей" на крилах для відлякування хижаків.'),
(5, 'Джміль польовий', 'bee', 30, 450.00, 'Пухнастий і миролюбний запилювач, активний навіть у прохолодну погоду.'),
(6, 'Сонечко двокрапкове', 'ladybug', 80, 130.00, 'Маленький помічник садівника, що ефективно очищує рослини від шкідників.'),
(7, 'Ladybag', 'ladybug', 80, 130.00, 'Маленький помічник садівника, що ефективно очищує рослини від шкідників.');


CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    insect_id INT NOT NULL,
    count INT NOT NULL,
    year VARCHAR(10) NOT NULL,
    FOREIGN KEY (insect_id) REFERENCES insect(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO cart (id, insect_id, count, year) VALUES
(65, 1, 1, '2024'),
(66, 2, 2, '2023');