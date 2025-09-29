#!/usr/bin/env node

/**
 * Content Management Script for Math 180A
 * Automatically updates content.json when adding new lectures or homework
 */

const fs = require('fs');
const path = require('path');

class ContentManager {
    constructor() {
        this.contentFile = 'content.json';
        this.content = this.loadContent();
    }

    loadContent() {
        try {
            const data = fs.readFileSync(this.contentFile, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading content.json:', error.message);
            process.exit(1);
        }
    }

    saveContent() {
        try {
            fs.writeFileSync(this.contentFile, JSON.stringify(this.content, null, 2));
            console.log('✅ content.json updated successfully!');
        } catch (error) {
            console.error('Error saving content.json:', error.message);
            process.exit(1);
        }
    }

    addLecture(lectureNumber, title, subtitle, topics) {
        const lectureId = `L${lectureNumber}`;
        
        // Check if lecture already exists
        const existingIndex = this.content.lectures.findIndex(l => l.id === lectureId);
        
        const newLecture = {
            id: lectureId,
            title: title,
            subtitle: subtitle,
            topics: topics,
            files: {
                html: `lectures/${lectureId}/${lectureId}.html`,
                markdown: `lectures/${lectureId}/${lectureId}.md`,
                pdf: `lectures/${lectureId}/Lecture_${lectureNumber}.pdf`
            },
            available: true
        };

        if (existingIndex >= 0) {
            this.content.lectures[existingIndex] = newLecture;
            console.log(`📝 Updated ${lectureId}: ${title}`);
        } else {
            this.content.lectures.push(newLecture);
            console.log(`➕ Added ${lectureId}: ${title}`);
        }

        // Sort lectures by number
        this.content.lectures.sort((a, b) => {
            const aNum = parseInt(a.id.replace('L', ''));
            const bNum = parseInt(b.id.replace('L', ''));
            return aNum - bNum;
        });

        this.saveContent();
    }

    addHomework(homeworkNumber, title, description, topics, hasSolution = false) {
        const homeworkId = `HW${homeworkNumber}`;
        
        // Check if homework already exists
        const existingIndex = this.content.homework.findIndex(h => h.id === homeworkId);
        
        const newHomework = {
            id: homeworkId,
            title: title,
            description: description,
            topics: topics,
            files: {
                ps: `homework/ps/Homework_${homeworkNumber}_ps.pdf`,
                sol: hasSolution ? `homework/sol/Homework_${homeworkNumber}_sol.pdf` : null
            },
            available: true
        };

        if (existingIndex >= 0) {
            this.content.homework[existingIndex] = newHomework;
            console.log(`📝 Updated ${homeworkId}: ${title}`);
        } else {
            this.content.homework.push(newHomework);
            console.log(`➕ Added ${homeworkId}: ${title}`);
        }

        // Sort homework by number
        this.content.homework.sort((a, b) => {
            const aNum = parseInt(a.id.replace('HW', ''));
            const bNum = parseInt(b.id.replace('HW', ''));
            return aNum - bNum;
        });

        this.saveContent();
    }

    addSolution(homeworkNumber) {
        const homeworkId = `HW${homeworkNumber}`;
        const homework = this.content.homework.find(h => h.id === homeworkId);
        
        if (!homework) {
            console.error(`❌ Homework ${homeworkId} not found!`);
            return;
        }

        homework.files.sol = `homework/sol/Homework_${homeworkNumber}_sol.pdf`;
        console.log(`✅ Added solution for ${homeworkId}`);
        this.saveContent();
    }

    listContent() {
        console.log('\n📚 Current Content:');
        console.log('\n📖 Lectures (in dropdown menu):');
        this.content.lectures.forEach(lecture => {
            console.log(`  ${lecture.id}: ${lecture.title}`);
        });

        console.log('\n📝 Homework (in grid layout):');
        this.content.homework.forEach(homework => {
            const solStatus = homework.files.sol ? '✅' : '⏳';
            console.log(`  ${homework.id}: ${homework.title} ${solStatus}`);
        });
        console.log('\n💡 Lectures appear in a dropdown menu to save space!');
        console.log('');
    }
}

// Command line interface
function main() {
    const args = process.argv.slice(2);
    const manager = new ContentManager();

    if (args.length === 0) {
        console.log('📚 Math 180A Content Manager');
        console.log('\nUsage:');
        console.log('  node add-content.js list                           # List current content');
        console.log('  node add-content.js lecture <num> "<title>" "<subtitle>" "<topic1,topic2,...>"');
        console.log('  node add-content.js homework <num> "<title>" "<description>" "<topic1,topic2,...>" [hasSolution]');
        console.log('  node add-content.js solution <num>                 # Add solution for homework');
        console.log('\nExamples:');
        console.log('  node add-content.js lecture 2 "Conditional Probability" "Introduction to conditional probability and Bayes theorem" "Conditional Probability,Bayes Theorem,Independence"');
        console.log('  node add-content.js homework 2 "Conditional Probability Problems" "Problems covering conditional probability concepts" "Conditional Probability,Independence" true');
        console.log('  node add-content.js solution 2');
        return;
    }

    const command = args[0];

    switch (command) {
        case 'list':
            manager.listContent();
            break;

        case 'lecture':
            if (args.length < 5) {
                console.error('❌ Usage: node add-content.js lecture <num> "<title>" "<subtitle>" "<topic1,topic2,...>"');
                return;
            }
            const [, num, title, subtitle, topicsStr] = args;
            const topics = topicsStr.split(',').map(t => t.trim());
            manager.addLecture(parseInt(num), title, subtitle, topics);
            break;

        case 'homework':
            if (args.length < 5) {
                console.error('❌ Usage: node add-content.js homework <num> "<title>" "<description>" "<topic1,topic2,...>" [hasSolution]');
                return;
            }
            const [, hwNum, hwTitle, hwDescription, hwTopicsStr, hasSolution] = args;
            const hwTopics = hwTopicsStr.split(',').map(t => t.trim());
            const hasSol = hasSolution === 'true';
            manager.addHomework(parseInt(hwNum), hwTitle, hwDescription, hwTopics, hasSol);
            break;

        case 'solution':
            if (args.length < 2) {
                console.error('❌ Usage: node add-content.js solution <num>');
                return;
            }
            const [, solNum] = args;
            manager.addSolution(parseInt(solNum));
            break;

        default:
            console.error(`❌ Unknown command: ${command}`);
            console.log('Run without arguments to see usage information.');
    }
}

if (require.main === module) {
    main();
}

module.exports = ContentManager;
