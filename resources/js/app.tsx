import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { InertiaProgress } from '@inertiajs/progress';
import { Toaster } from 'sonner'; 

createInertiaApp({
    // Função resolve atualizada
    resolve: (name: string) => {
        // Usa import.meta.glob para encontrar arquivos .jsx E .tsx
        const pages = import.meta.glob<{ default: React.ComponentType }>('./Pages/**/*.+(jsx|tsx)', { eager: true });

        // Encontra o caminho completo que corresponde ao nome da página (ex: 'Pages/Auth/login')
        let page = pages[`./Pages/${name}.jsx`] || pages[`./Pages/${name}.tsx`];

        // Se o nome vier com a extensão completa (improvável vindo do Laravel, mas seguro checar)
        if (!page) {
            page = pages[`./${name}`];
        }

        if (!page) {
             // Caso não encontre nenhum arquivo
            throw new Error(`Página não encontrada: ${name}`);
        }
        return page.default;
    },

    setup({ el, App, props }) {
        createRoot(el).render(
            <>
                <App {...props} />
                <Toaster position="top-right" /> 
            </>
        );
    },
});

InertiaProgress.init();
