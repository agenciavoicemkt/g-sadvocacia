document.addEventListener('DOMContentLoaded', () => {
    // Animação Ken Burns / zoom suave na imagem de fundo da hero
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
        requestAnimationFrame(() => {
            heroBg.classList.add('loaded');
        });
    }

    // Parallax removido a pedido
    // window.addEventListener('scroll', () => {
    //     if (heroBg) {
    //         const scrolled = window.scrollY;
    //         heroBg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
    //     }
    // }, { passive: true });

    const form = document.getElementById('leadForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Pega os valores
        const nome = document.getElementById('nome').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();

        if (nome && whatsapp) {
            // Número placeholder. O cliente precisa informar o número real nas perguntas abertas do plano.
            // Formato internacional, sem '+' ou '-'
            const numeroDestino = '5511920065663'; 
            
            const mensagem = `Olá! Meu nome é ${nome}. Tive um problema com meu voo e gostaria de falar com um advogado especialista. Meu contato é ${whatsapp}.`;
            
            const urlEncodedMessage = encodeURIComponent(mensagem);
            
            // Redireciona para o WhatsApp
            const whatsappUrl = `https://wa.me/${numeroDestino}?text=${urlEncodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
            
            // Opcional: Limpar formulário após envio
            form.reset();
        }
    });

    // Máscara simples para WhatsApp (apenas visual, sem biblioteca externa pesada para manter performático)
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // Efeito Hover Spotlight nos Bento Cards
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', x);
            card.style.setProperty('--mouse-y', y);
        });
    });

    // Lógica do FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;
            
            const isActive = item.classList.contains('active');
            
            // Fecha outros itens de FAQ abertos
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
