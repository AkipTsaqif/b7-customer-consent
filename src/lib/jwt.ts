import jwt from "jsonwebtoken";

const SECRET_KEY =
	process.env.JWT_SECRET_KEY ||
	"f751135d67bd9bd2e93c730ac978c06896cb2b219ccef87835bed7742982d6878e4ffd8649e61f30bd3b5d27ed5adb0dc45c7dd4e26e940117024d220db2deae66a6995caefee373bf4a364b509c2ad1619dc5113910848aca85b50a075316c1dbad2628eda858340a265678ad15d4d98c6c848111423d7585eda23331fa04f4d4835867e31978ac9c3406866b3ae8033faa5802980ff58a555c89dc8d5d8575254809e2ee0a813bb076dfb8d038f794017f37fad3ff2281888069a0d58191aeec9023b92fb8ec574cfceca3599fd99fdcc3f396ee76bf923e47685dbb6a5c5361cd520616c3d6a9ed9dbaf4a9da006d48795ba0cde7ece5879ac51e040af0a7";

// Generate JWT
export function generateToken(userId: string): string {
	const payload = { id: userId };
	return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

// Verify JWT
export function verifyToken(token: string) {
	try {
		return jwt.verify(token, SECRET_KEY);
	} catch {
		return null;
	}
}
