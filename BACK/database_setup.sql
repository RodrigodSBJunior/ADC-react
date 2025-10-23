-- Script para configurar SQL Server e criar banco de dados
-- Execute como administrador no SQL Server Management Studio

-- 1. Habilitar autenticação mista (SQL Server e Windows)
USE master;
GO

-- Alterar para modo de autenticação mista
EXEC xp_instance_regwrite N'HKEY_LOCAL_MACHINE', 
     N'Software\Microsoft\MSSQLServer\MSSQLServer', 
     N'LoginMode', REG_DWORD, 2;
GO

-- 2. Habilitar conta SA
ALTER LOGIN sa ENABLE;
GO

-- 3. Definir senha para SA
ALTER LOGIN sa WITH PASSWORD = '123456';
GO

-- 4. Criar o banco de dados
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'divulgai_db')
BEGIN
    CREATE DATABASE divulgai_db;
END
GO

-- 5. Usar o banco de dados
USE divulgai_db;
GO

-- 6. Criar tabela Usuario manualmente para garantir compatibilidade
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Usuario' AND xtype='U')
BEGIN
    CREATE TABLE Usuario (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        nome NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) NOT NULL UNIQUE,
        senha NVARCHAR(100) NOT NULL,
        cpf NVARCHAR(15) NULL,
        telefone NVARCHAR(15) NULL,
        data_nascimento DATE NULL,
        sexo NVARCHAR(1) NULL,
        tipo_usuario NVARCHAR(20) NOT NULL,
        data_cadastro DATETIME2 NOT NULL DEFAULT GETDATE(),
        status_usuario BIT NOT NULL DEFAULT 1
    );
END
GO

-- 7. Inserir dados de teste
IF NOT EXISTS (SELECT * FROM Usuario WHERE email = 'joao@email.com')
BEGIN
    INSERT INTO Usuario (nome, email, senha, cpf, telefone, data_nascimento, sexo, tipo_usuario)
    VALUES ('João Silva', 'joao@email.com', '123456', '12345678901', '11999999999', '1990-01-01', 'M', 'PACIENTE');
END
GO

IF NOT EXISTS (SELECT * FROM Usuario WHERE email = 'maria@email.com')
BEGIN
    INSERT INTO Usuario (nome, email, senha, cpf, telefone, data_nascimento, sexo, tipo_usuario)
    VALUES ('Maria Santos', 'maria@email.com', '123456', '98765432100', '11888888888', '1985-05-15', 'F', 'PROFISSIONAL');
END
GO

PRINT 'Configuração concluída. Reinicie o SQL Server para aplicar as mudanças.';
PRINT 'Usuários de teste criados:';
PRINT '- Paciente: joao@email.com / 123456';
PRINT '- Profissional: maria@email.com / 123456';