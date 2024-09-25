import os

def scan_directory(path, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        for root, dirs, files in os.walk(path):
            if 'node_modules' in dirs:
                dirs.remove('node_modules')  # Игнорируем node_modules
            if '.git' in dirs:
                dirs.remove('.git')  # Игнорируем .git
            level = root.replace(path, '').count(os.sep)
            indent = ' ' * 4 * level
            f.write('{}{}/\n'.format(indent, os.path.basename(root)))
            sub_indent = ' ' * 4 * (level + 1)
            for file_name in files:
                f.write('{}{}\n'.format(sub_indent, file_name))

# Получаем путь до текущей папки, где находится скрипт
folder_path = os.path.dirname(__file__)

# Вызываем функцию для сканирования текущей папки и сохранения структуры в файл
output_file = os.path.join(folder_path, 'directory_structure.txt')
scan_directory(folder_path, output_file)
print(f'Структура папок и файлов сохранена в файле: {output_file}')
