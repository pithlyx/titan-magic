import ctypes
import os
import subprocess
import sys
import psutil
import re


def run_command_with_admin(cmd):
    if ctypes.windll.shell32.IsUserAnAdmin():
        # User is already running with admin privileges, run the command directly
        os.system(cmd)
    else:
        # Re-run the script with admin privileges
        ctypes.windll.shell32.ShellExecuteW(
            None, "runas", sys.executable, __file__, None, 1)


def restart_mongodb():
    # Stop MongoDB service
    run_command_with_admin("net stop MongoDB")

    # Start MongoDB service
    run_command_with_admin("net start MongoDB")


def start_mongodb():
    # Start MongoDB service
    run_command_with_admin("net start MongoDB")


def stop_mongodb():
    # Stop MongoDB service
    run_command_with_admin("net stop MongoDB")


def open_config_folder(folder_path):
    # Open config in VScode
    os.chdir(folder_path)
    os.system("code .")


def is_mongodb_running():
    # Check if server is up by checking if the process is running
    for proc in psutil.process_iter(['name']):
        if proc.info['name'] == 'mongod.exe':
            return True
    return False


def change_bind_ip(file_path, bind_ip):
    # Change the bindIp setting in the MongoDB configuration file
    try:
        with open(file_path, 'r') as file:
            lines = file.readlines()

        # Find the line to be updated
        for i, line in enumerate(lines):
            if line.strip().startswith('bindIp:'):
                lines[i] = f"  bindIp: {bind_ip}\n"
                break

        # Write the updated lines back to the file
        with open(file_path, 'w') as file:
            file.writelines(lines)
        restart_mongodb()
        print("Bind IP updated successfully.")
    except FileNotFoundError:
        print("Unable to open the configuration file. Please check the file path.")


def change_port(file_path, port):
    # Change the port setting in the MongoDB configuration file
    try:
        with open(file_path, 'r') as file:
            lines = file.readlines()

        # Find the line to be updated
        for i, line in enumerate(lines):
            if line.strip().startswith('port:'):
                lines[i] = f"  port: {port}\n"
                break

        # Write the updated lines back to the file
        with open(file_path, 'w') as file:
            file.writelines(lines)
        restart_mongodb()
        print("Port updated successfully.")
    except FileNotFoundError:
        print("Unable to open the configuration file. Please check the file path.")


def ip_select():
    try:
        output = subprocess.check_output("ipconfig").decode("utf-8")
        sections = re.split(r'\r\n\r\n', output)
        ip_addresses = []
        address = 'IPv4 Address'
        index = 1
        print('-'*80)
        print("Available IP address sections:")
        print('-'*80)
        for section in sections:
            if address in section:
                # Find the IPv4 address line
                ip_line = [line.strip() for line in section.split(
                    '\n') if address in line]
                if ip_line:
                    print(f"{index}: {section}")
                    # Extract the IP address from the line
                    ip_address = ip_line[0].split(': ')[-1]
                    ip_addresses.append(ip_address)
                    index += 1
        print('-'*80)
        while True:
            ip_select = input("Please select an ip address: ")
            try:
                selection = int(ip_select) - 1
                if selection < len(ip_addresses):
                    return ip_addresses[selection]
                else:
                    print("Invalid Address")
            except ValueError:
                print("Input is not a number")
    except subprocess.CalledProcessError:
        pass
    return None


def get_connection(file_path):
    # Retrieve the bindIp and port from the MongoDB configuration file
    try:
        with open(file_path, 'r') as file:
            lines = file.readlines()

        bind_ip = None
        port = None

        for line in lines:
            if line.strip().startswith('bindIp:'):
                bind_ip = line.strip().split(': ')[-1]
            elif line.strip().startswith('port:'):
                port = line.strip().split(': ')[-1]

        if bind_ip and port:
            return f"{bind_ip}:{port}"
        else:
            return None
    except FileNotFoundError:
        print("Unable to open the configuration file. Please check the file path.")
        return None


def display_menu():
    print("========= MongoDB Server Menu =========")
    print("status - MongoDB server status")
    print("stop - Stop MongoDB server")
    print("start - Start MongoDB server")
    print("restart - Restart MongoDB server")
    print("port - Change MongoDB server port (port ####)")
    print("ip - Change MongoDB server IP (ip ###.###.#.##)")
    print("config - Open MongoDB configuration folder")
    print("connect - Get the connection string for server")
    print("quit - Quit")
    print("======================================")


def main():
    # Check if running with admin privileges
    if not ctypes.windll.shell32.IsUserAnAdmin():
        print("This script requires admin privileges to run.")
        ctypes.windll.shell32.ShellExecuteW(
            None, "runas", sys.executable, __file__, None, 1)
        sys.exit()

    config_file_path = r"C:\Program Files\MongoDB\Server\6.0\bin\mongod.cfg"

    display_menu()
    while True:
        choice = input("> Enter your command: ").lower()

        if choice == "status":
            status = "Running" if is_mongodb_running() else "Down"
            print("MongoDB Status:", status)
        elif choice == "restart":
            restart_mongodb()
            print("MongoDB server restarted successfully.")
        elif choice == "start":
            start_mongodb()
            print("MongoDB server started successfully.")
        elif choice == "stop":
            stop_mongodb()
            print("MongoDB server stopped successfully.")
        elif choice == "config":
            open_config_folder(os.path.dirname(config_file_path))
        elif choice.startswith("ip"):
            ip = ip_select()
            if ip:
                print(ip)
                change_bind_ip(config_file_path, ip)
            else:
                print("No IP addresses found.")
        elif choice == "port":
            port = input("Enter the new port (port ####): ")
            change_port(config_file_path, port)
        elif choice == "quit":
            break
        elif choice == "connect":
            connection_string = get_connection(config_file_path)
            if connection_string:
                print(f"Connection string: mongodb://{connection_string}/")
            else:
                print("Failed to retrieve the connection string.")
        else:
            print("Invalid command. Please try again.")


if __name__ == "__main__":
    main()
