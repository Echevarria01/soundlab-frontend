import os
import unidecode
import pymysql

# ------------------- CONFIG -------------------
# Carpeta donde están las imágenes
IMAGES_FOLDER = r"C:\Users\matyb\OneDrive\Documentos\GitHub\soundlab-frontend\public\img\productos"


# Configuración MySQL
DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = "123456"
DB_NAME = "soundlab"

# ------------------- FUNCIONES -------------------
def sanitize_filename(filename):
    """
    Convierte el nombre a minúsculas, quita tildes y reemplaza espacios por guiones bajos.
    Ejemplo: 'Amplificador Para Bajo Eléctrico.jpg' -> 'amplificador_para_bajo_electrico.jpg'
    """
    name, ext = os.path.splitext(filename)
    name = unidecode.unidecode(name)  # quita tildes
    name = name.lower().replace(" ", "_")
    return f"{name}{ext}"

# ------------------- RENOMBRAR ARCHIVOS -------------------
renamed_files = {}
for fname in os.listdir(IMAGES_FOLDER):
    old_path = os.path.join(IMAGES_FOLDER, fname)
    if os.path.isfile(old_path):
        new_name = sanitize_filename(fname)
        new_path = os.path.join(IMAGES_FOLDER, new_name)
        os.rename(old_path, new_path)
        renamed_files[fname] = new_name
        print(f"{fname}  -->  {new_name}")

# ------------------- ACTUALIZAR BASE DE DATOS -------------------
conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, db=DB_NAME)
cursor = conn.cursor()

for old_name, new_name in renamed_files.items():
    sql = "UPDATE soundlab_store_product SET image=%s WHERE image=%s"
    cursor.execute(sql, (new_name, old_name))

conn.commit()
cursor.close()
conn.close()

print("✅ Renombrado y base de datos actualizada correctamente.")
