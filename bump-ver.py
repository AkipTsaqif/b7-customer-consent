with open('version.txt', 'r') as file:
    current_version = file.read().strip()

version_segments = current_version.split('.')
version_segments[-1] = str(int(version_segments[-1]) + 1)
new_version = '.'.join(version_segments)

with open('version.txt', 'w') as file:
    file.write(new_version)

print(new_version)