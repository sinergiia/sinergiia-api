import { Router } from 'express';
import OpenAI from 'openai';

const router = Router();
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

router.post('/', async (req, res, next) => {
  if (!openai) {
    return res.status(503).json({ 
      error: 'Chat service unavailable',
      message: 'OpenAI API key not configured'
    });
  }

  try {
    const { message } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un asistente virtual de SinergiIA, una empresa española de automatización con IA para PYMEs. Responde de manera amable y profesional, en español, y guía a los usuarios hacia el formulario de contacto cuando detectes interés en los servicios."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    next(error);
  }
});

export default router;